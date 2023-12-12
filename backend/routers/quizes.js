const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

router.get("/", async (req, res, next) => {
   try {
      const quizes = await Quiz.find();
      if (!quizes) {
         res.status(404).json({
            success: false,
            message: "Quizes are not found",
         });
      }

      res.status(200).send(quizes);
   } catch (error) {
      next(error);
   }
});

router.get("/:id", async (req, res, next) => {
   try {
      const quiz = await Quiz.findById(req.params.id);

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
      const quiz = new Quiz({
         title: req.body.title,
         time: req.body.time,
         point: req.body.point,
         category: req.body.category,
         quizType: req.body.quizType,
         user: req.body.user,
         image: req.body.image,
         questions: req.body.questions,
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
      });
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

router.delete("/:id", async (req, res, next) => {
   try {
      const quiz = await Quiz.findByIdAndRemove(req.params.id);
      if (!quiz) {
         return res.status(500).json({
            success: false,
            message: "The quiz is not found",
         });
      }
      res.status(200).json({
         success: true,
         message: "The quiz was deleted",
      });
   } catch (error) {
      next(error);
   }
});

module.exports = router;
