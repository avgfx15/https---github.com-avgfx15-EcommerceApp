const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      // unique: true,
    },
    mobile: {
      type: Number,
      // required: true,
    },
    password: {
      type: String,
      select: false,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = SellerModel = mongoose.model("SellerModel", sellerSchema);
