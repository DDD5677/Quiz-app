const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const mongoose = require("mongoose");
const { upload } = require("../helpers/upload");

router.get("/", async (req, res, next) => {
   try {
      let filter = {};
      let page = 1;
      let limit = 6;
      let totalQuizes = 0;
      let pageSize = 1;

      if (req.query.page) {
         page = +req.query.page;
      }
      if (req.query.limit) {
         limit = +req.query.limit;
      }
      //Building filter object
      if (req.query.user) {
         filter["user"] = req.query.user;
      }
      if (req.query.search) {
         filter = {
            ...filter,
            title: { $regex: req.query.search, $options: "i" },
         };
      }
      if (req.query.category) {
         filter["category"] = req.query.category;
      }

      totalQuizes = await Quiz.countDocuments(filter).exec();
      if (!totalQuizes) {
         return res.status(200).json({
            quizList: [],
            pagination: {
               pageSize: 1,
               limit: limit,
               page: page,
            },
         });
      }
      pageSize = Math.ceil(totalQuizes / limit);
      if (page > pageSize) {
         return res.status(404).json({
            success: false,
            message: "Page is not found!",
         });
      }

      const quizList = await Quiz.find(filter)
         .sort(req.query.sort)
         .skip((page - 1) * limit)
         .limit(limit);

      if (!quizList) {
         res.status(404).json({
            success: false,
            message: "Quizes are not found",
         });
      }

      res.status(200).send({
         quizList: quizList,
         pagination: {
            pageSize: pageSize,
            limit: limit,
            page: page,
         },
      });
   } catch (error) {
      next(error);
   }
});

router.get("/:id", async (req, res, next) => {
   try {
      const quiz = await Quiz.findById(req.params.id).populate({
         path: "questions",
         select: "-correctAnswer",
      });

      if (!quiz) {
         res.status(404).json({
            success: false,
            message: "The quiz with given ID was not found",
         });
      }
      res.status(200).send(quiz);
   } catch (error) {
      next(error);
   }
});
router.get("/admin/:id", async (req, res, next) => {
   try {
      const quiz = await Quiz.findById(req.params.id).populate({
         path: "questions",
      });

      if (!quiz) {
         res.status(404).json({
            success: false,
            message: "The quiz with given ID was not found",
         });
      }
      res.status(200).send(quiz);
   } catch (error) {
      next(error);
   }
});
router.post("/", async (req, res, next) => {
   try {
      let quiz = new Quiz({
         title: req.body.title,
         time: req.body.time,
         point: req.body.point,
         category: req.body.category,
         quizType: req.body.quizType,
         user: req.body.user,
         image: req.body.image,
      });
      quiz = await quiz.save();

      if (!quiz) {
         res.status(404).json({
            success: false,
            message: "The quiz is not created",
         });
      }
      res.status(200).send(quiz);
   } catch (error) {
      next(error);
   }
});

router.put("/:id", async (req, res, next) => {
   try {
      if (!mongoose.isValidObjectId(req.params.id)) {
         return res.status(400).send("Invalid Quiz ID");
      }
      let updateBlock = {
         title: req.body.title,
         time: req.body.time,
         point: req.body.point,
         category: req.body.category,
         quizType: req.body.quizType,
      };
      const quiz = await Quiz.findByIdAndUpdate(req.params.id, updateBlock, {
         new: true,
      }).populate("questions");
      if (!quiz) {
         return res.status(500).json({
            success: false,
            message: "The quiz is not updated",
         });
      }
      res.status(200).send(quiz);
   } catch (error) {
      next(error);
   }
});
router.put(
   "/image/:id",
   upload("public/quizimg").single("image"),
   async (req, res, next) => {
      try {
         const quizExist = await Quiz.findById(req.params.id);
         if (!quizExist) {
            return res.status(400).send({
               success: false,
               message:
                  "The quiz cannot ne updated because quiz with given ID is not found",
            });
         }
         const file = req.file;
         if (!file) {
            return res.status(400).send({
               success: false,
               message: "No file",
            });
         }
         //------Delete old image if exist---------
         if (quizExist.image) {
            const img = quizExist.image.split("/");
            img.splice(0, 3);
            const result = path.join(__dirname, "../", ...img);
            if (fs.existsSync(result)) {
               fs.unlinkSync(result);
            }
         }
         //----------------------------------
         const basePath = `${req.protocol}://${req.get(
            "host"
         )}/public/quizimg/`;
         const fileName = req.file.filename;

         const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            {
               image: `${basePath}${fileName}`,
            },
            {
               new: true,
            }
         ).populate("questions");

         if (!quiz) {
            return res.status(500).json({
               success: false,
               message: "The quiz is not updated",
            });
         }
         res.status(200).send(quiz);
      } catch (error) {
         next(error);
      }
   }
);

router.delete("/:id", async (req, res, next) => {
   try {
      const quiz = await Quiz.findByIdAndDelete(req.params.id);
      if (!quiz) {
         return res.status(500).json({
            success: false,
            message: "The quiz is not found",
         });
      }
      //------Delete old image of quiz if exist---------
      if (quiz.image) {
         const img = quiz.image.split("/");
         img.splice(0, 3);
         const result = path.join(__dirname, "../", ...img);
         if (fs.existsSync(result)) {
            fs.unlinkSync(result);
         }
      }
      //----------------------------------

      //---------Delete questions of deleted quiz -----------
      await quiz.questions.map(async (question) => {
         const questionDeleted = await Question.findByIdAndDelete(question);
         //------Delete old image of question if exist---------
         if (questionDeleted.image) {
            const img = questionDeleted.image.split("/");
            img.splice(0, 3);
            const result = path.join(__dirname, "../", ...img);
            if (fs.existsSync(result)) {
               fs.unlinkSync(result);
            }
         }
         //----------------------------------
      });
      //res.status(200).send(quiz);
      res.status(200).json({
         success: true,
         message: "The quiz was deleted",
      });
   } catch (error) {
      next(error);
   }
});

module.exports = router;
