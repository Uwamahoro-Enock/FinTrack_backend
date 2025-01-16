// backend/models/transaction.js

// this is the model for transactions
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  type: { type: String },
  accountType: { type: String },
  amount: { type: Number},
  category: { type: String},
  subcategory: { type: String },
  description: { type: String },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction
