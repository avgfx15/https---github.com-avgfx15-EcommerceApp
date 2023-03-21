const mongoose = require("mongoose");
const config = require("../config/configSecret");

const dbUrl = config.dbUri;

const connectDB = mongoose.connect(dbUrl, (err) => {
  if (err) {
    console.log("Connection error");
  } else {
    console.log("Database Connect Successfully");
  }
});

module.exports = connectDB;
