const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema(
   {
      firstname: {
         type: String,
         required: [true, "Please enter your name"],
      },
      lastname: {
         type: String,
         required: [true, "Please enter your lastname"],
      },
      quiz: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Quiz",
         required: true,
      },
      finished: {
         type: Boolean,
         required: true,
         default: false,
      },
      score: {
         type: Number,
         required: true,
         default: 0,
      },
      correctAnswers: {
         type: Number,
         required: true,
         default: 0,
      },
      chooses: {
         type: Object,
         required: true,
         default: {},
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
   },
   { timestamps: true }
);

actionSchema.virtual("id").get(function () {
   return this._id.toHexString();
});
actionSchema.set("toJSON", {
   virtuals: true,
});

const Action = mongoose.model("Action", actionSchema);
module.exports = Action;
