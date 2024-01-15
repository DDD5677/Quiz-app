const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");
const User = require("../models/user");
const { default: axios } = require("axios");

router.get("/statistics", async (req, res, next) => {
   try {
      const pupils = await User.countDocuments({ role: "student" });
      const teachers = await User.countDocuments({ role: "teacher" });
      const quizes = await Quiz.countDocuments();
      res.status(200).send({ pupils, teachers, quizes });
   } catch (error) {
      next(error);
   }
});
router.post("/supports", async (req, res, next) => {
   try {
      const TOKEN = process.env.TOKEN;
      const CHAT_ID = process.env.CHAT_ID;
      const user = await User.findById(req.body.user);
      if (!user) {
         return res.status(400).send({
            success: false,
            message: "The user is not found",
         });
      }
      const data = {
         chat_id: CHAT_ID,
         text: `${user.lastname} ${user.firstname}\n user_id: ${user._id}\n Problem: ${req.body.msg}`,
      };
      const TELEGRAM_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
      await axios
         .post(TELEGRAM_URL, data)
         .then(() => {
            res.status(200).send({
               success: true,
               message: "message sended successfully",
            });
         })
         .catch((err) => {
            console.log("ERROR IN SENDING PROBLEM TO TELEGRAM", err);
            res.status(500).send({
               success: false,
               message: "message is not send",
            });
         });
   } catch (error) {
      next(error);
   }
});
module.exports = router;
