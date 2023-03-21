const bcrypt = require("bcryptjs");
const SellerModel = require("../models/sellerModel");

/// Seller Route Test
exports.sellerTest = async (req, res) => {
  res.send("Seller Test Routes");
};

/// Seller Sign Up route
exports.sellerSignup = async (req, res) => {
  try {
    /// Desctucture req from frontend body
    const { name, email, mobile, password } = req.body;
    /// Check by email, seller is exist in database or not
    const checkSeller = await SellerModel.findOne({ email: email });
    /// If seller exist then send response and message to frontend
    if (checkSeller) {
      return res
        .status(201)
        .json({ message: "Seller Already Exist", status: false });
    }
    /// If seller not Exist then hashing password to make secure by adding genslalt from bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    /// Save seller with new hashing password in database
    const newSeller = new SellerModel({
      name: name,
      email: email,
      mobile: mobile,
      password: hashPassword,
    });
    const seller = await newSeller.save();
    /// After saving in database send response and message to frontend
    return res.status(200).json({
      message: "Seller Saved Successfully",
      status: true,
      seller: seller,
    });
  } catch (error) {
    /// Any other or server error send message to frontend
    return res.status(500).json({ message: "Server Error", error: error });
  }
};

/// Seller Login Route
exports.sellerLogin = async (req, res) => {
  try {
    /// Desctucture req from frontend body
    const { email, password } = req.body;
    /// Check by email, seller is exist in database or not
    const checkSeller = await SellerModel.findOne({ email: email }).populate(
      "password"
    );
    /// If seller is not exist then send response and message to frontend
    if (!checkSeller) {
      return res.status(201).json({
        message: "Seller Not Exist Please Sign up first",
        status: false,
      });
    }
    /// If seller exist then hash the password and compare with database password

    const checkPassword = await bcrypt.compare(password, checkSeller.password);
    /// If password not match then send response and message to frontend
    if (!checkPassword) {
      return res.status(201).json({
        message: "Invalid Credentials",
        status: false,
      });
    }
    /// If password match then send response and message to frontend
    return res.status(200).json({
      message: "Seller Logged In Successfully",
      status: true,
      seller: checkSeller,
    });
  } catch (error) {
    /// Any other or server error send message to frontend
    return res.status(500).json({ message: "Server Error", error: error });
  }
};
