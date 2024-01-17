const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 3000;
const api = process.env.API_URL;
//const client_site = process.env.CLIENT_SITE;
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
const allowedOrigins = [
   "http://localhost:5173",
   "https://www.decco.space",
   "https://easy-quiz.onrender.com",
   "https://easyquiz1.netlify.app",
];
app.use(
   cors({
      origin: function (origin, callback) {
         // allow requests with no origin
         // (like mobile apps or curl requests)
         if (!origin) return callback(null, true);
         if (allowedOrigins.indexOf(origin) === -1) {
            var msg =
               "The CORS policy for this site does not " +
               "allow access from the specified Origin.";
            return callback(new Error(msg), false);
         }
         return callback(null, true);
      },
      credentials: true,
   })
);
// app.use(
//    cors({
//       origin: client_site,
//       credentials: true,
//    })
// );
app.options("*", cors());
app.enable("trust proxy");
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
