const express = require("express");
const app = express();
const mysql = require("mysql2");
require("dotenv").config();

// const db = mysql.createConnection({
//    host: process.env.DB_HOST,
//    user: process.env.DB_USER,
//    password: process.env.DB_PASSWORD,
//    database: process.env.DB_DATABASE,
// });
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
   res.status(200).send("server is running");
});

app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});
