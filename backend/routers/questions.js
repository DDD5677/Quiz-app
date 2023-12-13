const express = require("express");
const router = express.Router();
const Question = require("../models/question");
const Quiz = require("../models/quiz");

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

router.post("/", async (req, res, next) => {
   try {
      let question = new Question({
         text: req.body.text,
         correctAnswer: req.body.correctAnswer,
         answers: req.body.answers,
         difficulty: req.body.difficulty,
         questionType: req.body.questionType,
         point: req.body.point,
         category: req.body.category,
         image: req.body.image,
         user: req.body.user,
      });

      question = await question.save();
      if (!question) {
         return res.status(500).json({
            success: false,
            message: "The question is not created",
         });
      }
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
      res.status(200).send(quiz);
   } catch (error) {
      console.log(error);
      next(error);
   }
});
module.exports = router;
