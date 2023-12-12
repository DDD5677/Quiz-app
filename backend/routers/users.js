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
            message: "Users are not found!",
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
      // let userInfo = {
      //    firstname: req.body.firstname,
      //    lastname: req.body.lastname,
      //    email: req.body.email,
      //    phone: req.body.phone,
      //    password: req.body.password,
      //    role: req.body.role,
      // };
      // console.log(userInfo);
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
      next(error);
   }
});

router.post("/login", async (req, res, next) => {
   try {
      const user = await User.findOne({ email: req.body.email });
      const secret = process.env.secret;
      const err = {
         email: "",
         password: "",
      };
      if (!user) {
         err.email = "the user not found";
         return res.status(400).send(err);
      }

      if (user && bcrypt.compareSync(req.body.password, user.password)) {
         const token = jwt.sign(
            {
               userId: user.id,
               role: user.role,
            },
            secret,
            {
               expiresIn: "7d",
            }
         );
         res.status(200).send({ user: user, token: token });
      } else {
         err.password = "the password is wrong";
         res.status(400).send(err);
      }
   } catch (error) {
      next(error);
   }
});

router.get("/user/refresh", async (req, res, next) => {
   try {
      let token;
      let currentUser;
      const secret = process.env.secret;
      console.log(token, secret);
      if (
         req.headers["authorization"] &&
         req.headers["authorization"].split(" ")[0] === "Bearer"
      ) {
         token = req.headers["authorization"].split(" ")[1];
         console.log(token);
      } else {
         console.log("token is not found");
      }
      jwt.verify(token, secret, function (err, decoded) {
         if (err) {
            console.log("Error: ", err);
         }
         console.log("currentUser", decoded);
         currentUser = decoded;
      });
      const user = await User.findById(currentUser.userId).select("-password");

      if (!user) {
         res.status(500).json({
            message: "The user with givven Id was not found",
         });
      }
      res.status(200).send({ user: user });
   } catch (error) {
      next(error);
   }
});

module.exports = router;
