const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { upload } = require("../helpers/upload");

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
      if (
         req.headers["authorization"] &&
         req.headers["authorization"].split(" ")[0] === "Bearer"
      ) {
         token = req.headers["authorization"].split(" ")[1];
      } else {
         console.log("token is not found");
      }
      jwt.verify(token, secret, function (err, decoded) {
         if (err) {
            console.log("Error: ", err);
         }
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

router.put(
   "/:id",
   upload("public/avatars").single("avatar"),
   async (req, res, next) => {
      try {
         const userExist = await User.findById(req.params.id);
         if (!userExist) {
            return res.status(400).send({
               success: false,
               message:
                  "The user cannot ne updated because user with given ID is not found",
            });
         }
         let newPassword;
         let basePath;
         let fileName;
         let updateBlock = {};
         if (req.body.firstname) {
            updateBlock.firstname = req.body.firstname;
         }
         if (req.body.lastname) {
            updateBlock.lastname = req.body.lastname;
         }
         if (req.body.email) {
            updateBlock.email = req.body.email;
         }
         if (req.body.phone) {
            updateBlock.phone = req.body.phone;
         }
         const file = req.file;
         if (file) {
            if (userExist.image) {
               const img = userExist.image.split("/");
               img.splice(0, 3);
               const result = path.join(__dirname, "../", ...img);
               if (fs.existsSync(result)) {
                  fs.unlinkSync(result);
               }
            }
            basePath = `${req.protocol}://${req.get("host")}/public/avatars/`;
            fileName = req.file.filename;
            updateBlock["image"] = `${basePath}${fileName}`;
         }
         if (req.body.password) {
            if (bcrypt.compareSync(req.body.password, userExist.password)) {
               if (req.body.newPassword) {
                  if (req.body.newPassword.length < 6) {
                     return res.status(400).json({
                        password:
                           "the password length must be at least 6 characters!",
                     });
                  } else {
                     newPassword = req.body.newPassword;
                  }
               } else {
                  return res.status(400).json({
                     password:
                        "the password length must be at least 6 characters!",
                  });
               }
            } else {
               return res.status(400).json({
                  password: "the password is wrong!",
               });
            }
            updateBlock.newPassword = newPassword;
         }

         const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            updateBlock,
            {
               new: true,
               runValidators: true,
            }
         ).select("-password");

         if (!user) {
            return res.status(400).send({
               success: false,
               message: "the user is not updated!",
            });
         }

         res.status(200).send({ user });
      } catch (error) {
         next(error);
      }
   }
);

module.exports = router;
