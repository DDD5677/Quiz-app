const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Question = require("../models/question");
const Quiz = require("../models/quiz");
const { upload } = require("../helpers/upload");

router.get("/", async (req, res, next) => {
   try {
      const questions = await Question.find();

      if (!questions) {
         return res.status(404).json({
            success: false,
            message: "The questions is not found",
         });
      }

      res.status(200).send(questions);
   } catch (error) {
      next(error);
   }
});

router.get("/:id", async (req, res, next) => {
   try {
      const question = await Question.findById(req.params.id);
      if (!question) {
         return res.status(404).json({
            success: false,
            message: "The question with given Id is not found",
         });
      }

      res.status(200).send(question);
   } catch (error) {
      next(error);
   }
});

router.post(
   "/",
   upload("public/questionimg").single("image"),
   async (req, res, next) => {
      try {
         let question;
         let questionData = {
            text: req.body.text,
            correctAnswer: +req.body.correctAnswer,
            answers: JSON.parse(req.body.answers),
            difficulty: req.body.difficulty,
            questionType: req.body.questionType,
            point: +req.body.point,
            category: req.body.category,
            user: req.body.user,
         };
         //check file exist or not
         if (req.file) {
            const basePath = `${req.protocol}://${req.get(
               "host"
            )}/public/questionimg/`;
            const fileName = req.file.filename;
            questionData["image"] = `${basePath}${fileName}`;
         } else {
            questionData["image"] = "";
         }

         if (req.body.questionId) {
            //find existed question
            const questionExist = await Question.findById(req.body.questionId);
            if (!questionExist) {
               return res.status(500).json({
                  success: false,
                  message: "The question with given ID is not found",
               });
            }
            //delete old image of question
            if (questionExist.image) {
               const img = questionExist.image.split("/");
               img.splice(0, 3);
               const result = path.join(__dirname, "../", ...img);
               if (fs.existsSync(result)) {
                  fs.unlinkSync(result);
               }
            }
            //update existed question
            question = await Question.findByIdAndUpdate(
               req.body.questionId,
               questionData,
               { new: true }
            );
            if (!question) {
               return res.status(500).json({
                  success: false,
                  message: "The question is not updated",
               });
            }
         } else {
            //create new question
            question = new Question({ ...questionData });
            question = await question.save();

            if (!question) {
               return res.status(500).json({
                  success: false,
                  message: "The question is not created",
               });
            }
            //add created question to Quiz
            const quiz = await Quiz.findByIdAndUpdate(
               req.body.quizId,
               { $push: { questions: question._id } },
               { new: true }
            ).populate("questions");
            if (!quiz) {
               return res.status(500).json({
                  success: false,
                  message: "The question is not added to quiz",
               });
            }
         }
         res.status(200).send({
            success: true,
            message: "Question is created or updated successfully",
         });
      } catch (error) {
         console.log(error);
         next(error);
      }
   }
);

router.delete("/", async (req, res, next) => {
   try {
      console.log(req.query);
      const question = await Question.findByIdAndDelete(req.query.questionId);
      if (!question) {
         return res.status(500).json({
            success: false,
            message: "The question is not found",
         });
      }
      //delete old image of question
      if (question.image) {
         const img = question.image.split("/");
         img.splice(0, 3);
         const result = path.join(__dirname, "../", ...img);
         if (fs.existsSync(result)) {
            fs.unlinkSync(result);
         }
      }
      //delete from quiz
      const quiz = await Quiz.findByIdAndUpdate(
         req.query.quizId,
         { $pull: { questions: req.query.questionId } },
         { new: true }
      );
      if (!quiz) {
         return res.status(500).json({
            success: false,
            message: "The quiz is not found",
         });
      }
      res.status(200).send({
         success: true,
         message: "Question is deleted successfully",
      });
   } catch (error) {
      next(error);
   }
});
module.exports = router;
