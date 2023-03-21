const express = require("express");
const { cartTest, addToCart } = require("../controllers/cartController");
const cartRoute = express.Router();

cartRoute.get("/test", cartTest);
cartRoute.post("/addtocart/:id", addToCart);

module.exports = cartRoute;
