const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {
   try {
      const users = await User.find();
      if (!users) {
         res.status(404).json({
            success: false,
            message: "Users is not found!",
         });
      }

      res.status(200).send(users);
   } catch (error) {
      next(error);
   }
});

router.get("/:id", async (req, res, next) => {
   try {
      const user = await User.findById(req.params.id).select("-password");

      if (!user) {
         res.status(500).json({
            message: "The user with given ID was not found",
         });
      }

      res.status(200).send(user);
   } catch (error) {
      next(error);
   }
});

router.post("/", async (req, res, next) => {
   try {
      let userInfo = {
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         email: req.body.email,
         phone: req.body.phone,
         password: req.body.password,
         role: req.body.role,
      };
      console.log(userInfo);
      let user = new User({
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         email: req.body.email,
         phone: req.body.phone,
         password: req.body.password,
         role: req.body.role,
      });
      user = await user.save();

      if (!user) {
         return res.status(404).send("the user cannot be created");
      }

      res.status(200).send(user);
   } catch (error) {
      console.log(error);
      next(error);
   }
});

router.post("/register", async (req, res, next) => {
   try {
      let user = new User({
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         email: req.body.email,
         phone: req.body.phone,
         password: req.body.password,
         role: req.body.role,
         image: req.body.image,
      });
      user = await user.save();

      if (!user) {
         return res.status(404).send("the user cannot be created");
      }

      res.status(200).send(user);
   } catch (error) {
      res.status(500).json({ error });
   }
});
module.exports = router;
