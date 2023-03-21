const express = require("express");
const { userSignUp, userLogin } = require("../controllers/userControllers");
const userRoutes = express.Router();
const User = require("../models/userModel");

userRoutes.get("/", async (req, res) => {
  res.json({ message: "User Router Works good" });
});

userRoutes.post("/signup", userSignUp);
userRoutes.post("/login", userLogin);

module.exports = userRoutes;
