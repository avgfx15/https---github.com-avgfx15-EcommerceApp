const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ProductModel,
    },

    cartQty: {
      type: Number,
    },
    cartProductPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = CartModel = mongoose.model("CartModel", CartSchema);
