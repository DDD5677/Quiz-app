const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
   {
      body: {
         type: String,
         required: [true, "Please enter question text"],
      },
      correct_answer: {
         type: String,
         required: [true, "Please choose correct answer"],
      },
      answers: [
         {
            type: String,
            required: true,
         },
      ],
      difficulty: {
         type: Number,
         required: [true, "Please choose level of difficulty"],
      },
      questionType: {
         type: String,
         required: true,
      },
      category: {
         type: String,
         required: [true, "Please choose category of question"],
      },
      image: {
         type: String,
         default: "",
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   },
   { timestamps: true }
);

questionSchema.virtual("id").get(function () {
   return this._id.toHexString();
});
questionSchema.set("toJSON", {
   virtuals: true,
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
