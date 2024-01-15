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
            answers: JSON.parse(req.body.answers),
            user: req.body.user,
         };
         console.log(req.body);
         if (req.body.correctAnswer || +req.body.correctAnswer === 0) {
            questionData.correctAnswer = +req.body.correctAnswer;
         }
         if (req.body.difficulty) {
            questionData.difficulty = +req.body.difficulty;
         }
         if (req.body.questionType) {
            questionData.questionType = req.body.questionType;
         }
         if (req.body.point) {
            questionData.point = +req.body.point;
         }
         if (req.body.category) {
            questionData.category = req.body.category;
         }
         console.log(questionData);
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
            //-----UPDATE QUESTION-----
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
            //change difficulty of quiz if question difficulty is updated
            if (questionExist.difficulty !== questionData.difficulty) {
               const quizExist = await Quiz.findById(req.body.quizId).select(
                  "questions difficulty"
               );
               if (!quizExist) {
                  return res.status(500).json({
                     success: false,
                     message: "The quiz with given quizId is not found",
                  });
               }
               const amountOfQuestions = quizExist.questions.length;
               const sumDifficulties = quizExist.difficulty * amountOfQuestions;
               const newDifficulty = (
                  (sumDifficulties -
                     questionExist.difficulty +
                     questionData.difficulty) /
                  amountOfQuestions
               ).toFixed(2);
               //change difficulty of Quiz
               const quiz = await Quiz.findByIdAndUpdate(
                  req.body.quizId,
                  {
                     difficulty: newDifficulty,
                  },
                  { new: true }
               );
               if (!quiz) {
                  return res.status(500).json({
                     success: false,
                     message: "The difficulty of quiz is not updated",
                  });
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
            //------CREATE NEW QUESTION --------
            question = new Question({ ...questionData });
            question = await question.save();

            if (!question) {
               return res.status(500).json({
                  success: false,
                  message: "The question is not created",
               });
            }
            //get existed Quiz
            const quizExist = await Quiz.findById(req.body.quizId).select(
               "questions difficulty"
            );
            if (!quizExist) {
               return res.status(500).json({
                  success: false,
                  message: "The quiz with given quizId is not found",
               });
            }
            const amountOfQuestions = quizExist.questions.length;
            const sumDifficulties = quizExist.difficulty * amountOfQuestions;
            const newDifficulty = (
               (sumDifficulties + question.difficulty) /
               (amountOfQuestions + 1)
            ).toFixed(2);
            //add created question to Quiz
            const quiz = await Quiz.findByIdAndUpdate(
               req.body.quizId,
               {
                  $push: { questions: question._id },
                  difficulty: newDifficulty,
               },
               { new: true }
            );
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
      //get existed Quiz
      const quizExist = await Quiz.findById(req.query.quizId).select(
         "questions difficulty"
      );
      if (!quizExist) {
         return res.status(500).json({
            success: false,
            message: "The quiz with given quizId is not found",
         });
      }
      const amountOfQuestions = quizExist.questions.length;
      let newDifficulty;
      if (amountOfQuestions === 1) {
         newDifficulty = 0;
      } else {
         const sumDifficulties = quizExist.difficulty * amountOfQuestions;
         newDifficulty = (
            (sumDifficulties - question.difficulty) /
            (amountOfQuestions - 1)
         ).toFixed(2);
         console.log("sumDifficulties", sumDifficulties);
      }
      console.log("quizExist", quizExist);
      console.log("amountOfQuestions", amountOfQuestions);
      console.log("newDifficulty", newDifficulty);
      //delete from quiz
      const quiz = await Quiz.findByIdAndUpdate(
         req.query.quizId,
         {
            $pull: { questions: req.query.questionId },
            difficulty: newDifficulty,
         },
         { new: true }
      );
      console.log("quiiz", quiz);
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
      console.log(error);
      next(error);
   }
});
module.exports = router;
