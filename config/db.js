// let create database connection that will allow us to connect to the MongoDB.

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Terminates the process with a non-zero exit code ensuring that the application doesn’t continue running in a broken state.
  }
};

module.exports = connectDB;
