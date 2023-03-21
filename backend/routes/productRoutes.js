const express = require("express");
const {
  productTestRoute,
  addNewProduct,
  getAllProducts,
  deleteProductById,
  updateProductById,
  getProductById,
  latestProducts,
  trendyProducts,
  querySelector,
} = require("../controllers/productController");
const productRoute = express.Router();

productRoute.get("/test", productTestRoute);
productRoute.post("/addproduct", addNewProduct);
productRoute.get("/allproducts", getAllProducts);
productRoute.get("/product/:id", getProductById);
productRoute.delete("/delete/:id", deleteProductById);
productRoute.patch("/update/:id", updateProductById);
productRoute.get("/latestproducts", latestProducts);
productRoute.get("/trendyproducts", trendyProducts);
productRoute.get("/:text", querySelector);

module.exports = productRoute;
