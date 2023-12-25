const express = require("express");
const router = express.Router();
const Action = require("../models/action");
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const mongoose = require("mongoose");

router.get("/", async (req, res, next) => {
   try {
      let filter = {};
      if (req.query.user) {
         filter.user = req.query.user;
      }
      if (req.query.finished) {
         filter.finished = req.query.finished;
      }
      const actions = await Action.find(filter);

      if (!actions) {
         return res.status(404).json({
            success: false,
            message: "The action is not found",
         });
      }

      res.status(200).send(actions);
   } catch (error) {
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
      console.log(error);
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
      console.log(updateBlock);
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
      console.log(req.body);
      let updateBlock = {
         finished: true,
      };
      let correctAnswers = 0;
      let score = 0;
      if (req.body.chooses) {
         for (const key in req.body.chooses) {
            console.log(key);
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
         updateBlock.correctAnswers = correctAnswers;
         updateBlock.score = score;
      }
      console.log(updateBlock);
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
