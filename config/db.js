// backend/config/db.js
// I am creating database connection.

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
