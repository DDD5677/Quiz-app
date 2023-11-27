const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
   try {
   } catch (error) {
      res.status(500).json({ error });
   }
});

module.exports = router;
