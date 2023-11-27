const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 3000;
const api = process.env.API_URL;

//! import routers
const usersRouter = require("./routers/users");

//!Middlewares
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());

//! routers
app.use(`${api}/users`, usersRouter);

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
