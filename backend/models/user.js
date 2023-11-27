const mongoose = require("mongoose");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema(
   {
      firstname: {
         type: String,
         required: [true, "Please enter your firstname"],
      },
      lastname: {
         type: String,
         default: "",
      },
      email: {
         type: String,
         required: [true, "Please enter an email"],
         unique: true,
         lowercase: true,
         validate: [isEmail, "Please enter a valid email"],
      },
      password: {
         type: String,
         required: [true, "Please enter a password"],
         minlength: [6, "Minimum password length is 6 characters"],
      },
      phone: {
         type: String,
         required: [true, "Please enter a phone"],
      },
      role: {
         type: String,
         required: [true, "Please choose your role"],
      },
      image: {
         type: String,
         default: "",
      },
   },
   { timestamps: true }
);

userSchema.virtual("id").get(function () {
   return this._id.toHexString();
});
userSchema.set("toJSON", {
   virtuals: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
