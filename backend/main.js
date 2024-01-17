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
const { authJwt } = require("./helpers/jwt");

//! import routers
const usersRouter = require("./routers/users");
const quizesRouter = require("./routers/quizes");
const questionsRouter = require("./routers/questions");
const actionsRouter = require("./routers/actions");
const settingsRouter = require("./routers/settings");
const cookieParser = require("cookie-parser");
//!Middlewares
app.use(
   cors({
      origin: "http://decco.space",
      credentials: true,
   })
);
app.options("*", cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public", express.static(__dirname + "/public"));
//! routers
app.use(`${api}/users`, usersRouter);
app.use(`${api}/quizes`, quizesRouter);
app.use(`${api}/questions`, questionsRouter);
app.use(`${api}/actions`, actionsRouter);
app.use(`${api}/settings`, settingsRouter);

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
