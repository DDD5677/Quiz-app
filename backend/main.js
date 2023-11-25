const express = require("express");
const app = express();
const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   port: process.env.DB_PORT,
});
const db = pool.promise();

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
   const result = await db.query("SELECT * FROM test");
   console.log(result);
   res.status(200).send(result[0]);
});

app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});
