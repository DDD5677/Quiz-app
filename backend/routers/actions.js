const express = require("express");
const router = express.Router();
const Action = require("../models/action");
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const mongoose = require("mongoose");
const axios = require("axios");

router.get("/", async (req, res, next) => {
   try {
      let filter = {};
      let page = 1;
      let limit = 10;
      let totalActions = 0;
      let pageSize = 1;
      if (req.query.page) {
         page = +req.query.page;
      }
      if (req.query.limit) {
         limit = +req.query.limit;
      }
      //----Building filter object------
      if (req.query.quiz) {
         filter.quiz = req.query.quiz;
      }
      if (req.query.search) {
         filter.firstname = { $regex: req.query.search, $options: "i" };
      }
      if (req.query.date) {
         filter.createdAt = {
            $gte: req.query.date, // Greater than or equal to startDate
            //$lte: endDate    // Less than or equal to endDate
         };
      }
      console.log(filter);
      totalActions = await Action.countDocuments(filter).exec();
      if (!totalActions) {
         return res.status(200).send({
            actionList: [],
            pagination: {
               pageSize: 1,
               limit: limit,
               page: page,
            },
         });
      }
      pageSize = Math.ceil(totalActions / limit);
      if (page > pageSize) {
         return res.status(404).json({
            success: false,
            message: "Page is not found!",
         });
      }

      const actionList = await Action.find(filter)
         .sort(req.query.sort)
         .skip((page - 1) * limit)
         .limit(limit);

      if (!actionList) {
         return res.status(404).json({
            success: false,
            message: "The actions are not found",
         });
      }

      res.status(200).send({
         actionList: actionList,
         pagination: {
            pageSize: pageSize,
            limit: limit,
            page: page,
         },
      });
   } catch (error) {
      console.log(error);
      next(error);
   }
});
router.get("/active", async (req, res, next) => {
   try {
      const action = await Action.find({
         user: req.query.user,
         finished: false,
      }).populate({
         path: "quiz",
         populate: {
            path: "questions",
            select: "-correctAnswer",
         },
      });

      if (!action) {
         return res.status(404).json({
            success: false,
            message: "The active action is not found",
         });
      }

      res.status(200).send(action);
   } catch (error) {
      next(error);
   }
});
router.get("/:id", async (req, res, next) => {
   try {
      let action = await Action.findById(req.params.id);
      if (action.finished) {
         action = await Action.findById(req.params.id).populate({
            path: "quiz",
            populate: "questions",
         });
      } else {
         action = await Action.findById(req.params.id).populate({
            path: "quiz",
            populate: {
               path: "questions",
               select: "-correctAnswer",
            },
         });
      }
      if (!action) {
         return res.status(404).json({
            success: false,
            message: "The action with given Id is not found",
         });
      }

      res.status(200).send(action);
   } catch (error) {
      next(error);
   }
});

router.post("/", async (req, res, next) => {
   try {
      let action = new Action({
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         quiz: req.body.quizId,
         user: req.body.user,
      });
      action = await action.save();

      if (!action) {
         return res.status(404).send("the action cannot be created");
      }

      res.status(200).send(action);
   } catch (error) {
      next(error);
   }
});

router.put("/:id", async (req, res, next) => {
   try {
      if (!mongoose.isValidObjectId(req.params.id)) {
         return res.status(400).send("Invalid Quiz ID");
      }
      let updateBlock = {};
      let query = {};
      if (req.body.chooses) {
         query["chooses." + req.body.chooses.id] = req.body.chooses.choose;
         updateBlock["$set"] = query;
      }
      if (req.body.firstname) {
         updateBlock.firstname = req.body.firstname;
      }
      if (req.body.lastname) {
         updateBlock.lastname = req.body.lastname;
      }
      if (req.body.finished) {
         updateBlock.finished = req.body.finished;
      }
      const action = await Action.findByIdAndUpdate(
         req.params.id,
         updateBlock,
         {
            new: true,
         }
      ).select("chooses");
      if (!action) {
         return res.status(500).json({
            success: false,
            message: "The action is not updated",
         });
      }
      res.status(200).send(action);
   } catch (error) {
      next(error);
   }
});
router.put("/finish/:id", async (req, res, next) => {
   try {
      if (!mongoose.isValidObjectId(req.params.id)) {
         return res.status(400).send("Invalid Quiz ID");
      }
      const actionExist = await Action.findById(req.params.id)
         .populate("quiz")
         .populate("user");
      console.log(actionExist);
      if (!actionExist) {
         return res.status(404).json({
            success: false,
            message: "The action is not found",
         });
      }
      let updateBlock = {
         finished: true,
      };
      let correctAnswers = 0;
      let score = 0;
      if (req.body.chooses) {
         if (actionExist.quiz.mixedScore) {
            for (const key in req.body.chooses) {
               const question = await Question.findById(key);
               if (question) {
                  if (question.correctAnswer === req.body.chooses[key]) {
                     correctAnswers++;
                     score += question.point;
                  }
               } else {
                  console.log("question is not found");
               }
            }
         } else {
            for (const key in req.body.chooses) {
               const question = await Question.findById(key);
               if (question) {
                  if (question.correctAnswer === req.body.chooses[key]) {
                     correctAnswers++;
                     score += actionExist.quiz.point;
                  }
               } else {
                  console.log("question is not found");
               }
            }
         }
         updateBlock.correctAnswers = correctAnswers;
         updateBlock.score = score.toFixed(2);
      }
      //-------Send result to telegram-----------
      const TOKEN = process.env.TOKEN;
      const CHAT_ID = actionExist.user.telegramId;
      const data = {
         chat_id: CHAT_ID,
         text: `${req.body.lastname} ${req.body.firstname}\n ${req.body.quiz} testidan ${updateBlock.correctAnswers} ta savolga tog'ri javob berib, ${updateBlock.score}ball to'pladi`,
      };
      const TELEGRAM_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
      await axios
         .post(TELEGRAM_URL, data)
         .catch((err) => console.log("ERROR IN SENDING RESULT OF QUIZ", err));
      //--------------------
      const action = await Action.findByIdAndUpdate(
         req.params.id,
         updateBlock,
         {
            new: true,
         }
      ).populate({
         path: "quiz",
         populate: "questions",
      });
      if (!action) {
         return res.status(500).json({
            success: false,
            message: "The action is not updated",
         });
      }
      res.status(200).send(action);
   } catch (error) {
      next(error);
   }
});
module.exports = router;
