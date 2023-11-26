const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 3000;
const api = process.env.API_URL;
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
