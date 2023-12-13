const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
   {
      questions: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            // required: [
            //    true,
            //    "There is no question, Please create at least one question",
            // ],
         },
      ],
      title: {
         type: String,
         required: [true, "Please enter title"],
      },
      time: {
         type: String,
         required: [true, "Please enter time"],
      },
      point: {
         type: Number,
         default: 1,
      },
      category: {
         type: String,
         required: [true, "Please choose category"],
      },
      quizType: {
         type: String,
         required: [true, "Please choose type"],
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      image: {
         type: String,
         default: "",
      },
   },
   { timestamps: true }
);

quizSchema.virtual("id").get(function () {
   return this._id.toHexString();
});
quizSchema.set("toJSON", {
   virtuals: true,
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
