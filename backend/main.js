const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 3000;
const api = process.env.API_URL;
const errorHandler = require("./helpers/error-handler");

//! import routers
const usersRouter = require("./routers/users");
const quizesRouter = require("./routers/quizes");
const questionsRouter = require("./routers/questions");
//!Middlewares
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

//! routers
app.use(`${api}/users`, usersRouter);
app.use(`${api}/quizes`, quizesRouter);
app.use(`${api}/questions`, questionsRouter);

//! Error Handler
app.use(errorHandler);

mongoose
   .connect(process.env.CONNECTING_STRING)
   .then(() => {
      console.log("Database connection is ready");
   })
   .catch((err) => {
      console.log(err);
   });

app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});
