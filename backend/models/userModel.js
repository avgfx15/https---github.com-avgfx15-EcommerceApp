const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    password: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = UserModel = mongoose.model("User", userSchema);
