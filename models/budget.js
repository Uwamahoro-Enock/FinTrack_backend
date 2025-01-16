// backend/models/budget.js
const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  spent: { type: Number, default: 0 },
  period: { type: String, required: true }, // monthly, weekly, etc.
  startDate: { type: Date, default: Date.now },
  notifications: [{
    type: { type: String }, // warning, exceeded
    date: { type: Date },
    message: { type: String }
  }]
});

const Budget = mongoose.model("Budget", BudgetSchema);
module.exports = Budget;