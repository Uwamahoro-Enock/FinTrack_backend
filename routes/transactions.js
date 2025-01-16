// backend/routes/transactions.js
const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");

// Add a transaction
router.post("/", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).json({ message: "Transaction added successfully!" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Something went wrong please try again."
     });
  }
});

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
