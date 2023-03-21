const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

//` User Sign Up Controller
exports.userSignUp = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    /// Check if User exist or not
    const userExist = await User.findOne({ email: email });

    /// User already Exist then sent response to frontend
    if (userExist) {
      return res
        .status(201)
        .json({ message: "User Already Exist", status: false });
    }
    /// User not exist then create new user, hash password and save to database

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      mobile: mobile,
      password: hashPassword,
    });

    const saveUser = await newUser.save();

    /// User save database and then send response to frontend
    return res.status(200).json({
      message: "User Sign Up Successfully",
      status: true,
      user: saveUser,
    });
  } catch (error) {
    /// Server error send response to frontend
    return res.json({ message: "Server Error", status: false, error });
  }
};

//` User Login

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email: email }).select("+password");

    if (!checkUser) {
      return res.status(201).json({ message: "User not exist", status: false });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res
        .status(201)
        .json({ message: "Invalid Credentials", status: false });
    }
    return res.status(200).json({
      message: "User Login Successfully",
      status: true,
      user: checkUser,
    });
  } catch (error) {
    /// Server error send response to frontend
    return res.json({ message: "Server Error", status: false, error });
  }
};
