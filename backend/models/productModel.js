const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SellerModel",
    },
    productName: {
      type: String,
    },
    productQty: {
      type: Number,
    },
    productCategory: {
      type: String,
    },
    productColor: {
      type: String,
    },
    productPrice: {
      type: String,
    },
    productImage: {
      type: String,
    },
    productDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = ProductModel = mongoose.model("ProductModel", productSchema);
