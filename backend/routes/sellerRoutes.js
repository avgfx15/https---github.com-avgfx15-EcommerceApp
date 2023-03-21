const express = require("express");
const {
  sellerTest,
  sellerSignup,
  sellerLogin,
} = require("../controllers/sellerControllers");
const sellerRoute = express.Router();

sellerRoute.get("/", sellerTest);
sellerRoute.post("/signup", sellerSignup);
sellerRoute.post("/login", sellerLogin);

module.exports = sellerRoute;
