// backend/routes/budgets.js
const express = require("express");
const router = express.Router();
const Budget = require("../models/budget");
const Transaction = require("../models/transaction");

// Get all budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new budget
router.post("/", async (req, res) => {
  const budget = new Budget({
    category: req.body.category,
    amount: req.body.amount,
    period: req.body.period
  });

  try {
    const newBudget = await budget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Check budget status and send notifications
router.post("/check-status", async (req, res) => {
  try {
    const budgets = await Budget.find();
    const currentDate = new Date();
    
    for (let budget of budgets) {
      const transactions = await Transaction.find({
        category: budget.category,
        date: { 
          $gte: budget.startDate,
          $lte: currentDate
        }
      });
      
      const totalSpent = transactions.reduce((sum, tx) => sum + tx.amount, 0);
      budget.spent = totalSpent;
      
      // Check if spending exceeds 80% of budget (warning)
      if (totalSpent >= budget.amount * 0.8 && totalSpent < budget.amount) {
        budget.notifications.push({
          type: "warning",
          date: currentDate,
          message: `You've used ${Math.round((totalSpent/budget.amount) * 100)}% of your ${budget.category} budget`
        });
      }
      
      // Check if budget is exceeded
      if (totalSpent >= budget.amount) {
        budget.notifications.push({
          type: "exceeded",
          date: currentDate,
          message: `Budget exceeded for ${budget.category}`
        });
      }
      
      await budget.save();
    }
    
    res.json({ message: "Budget status checked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Update fields if they are provided in the request
    if (req.body.budgetSet !== undefined) budget.budgetSet = req.body.budgetSet;
    if (req.body.amount !== undefined) budget.amount = req.body.amount;
    if (req.body.category !== undefined) budget.category = req.body.category;
    if (req.body.period !== undefined) budget.period = req.body.period;

    const updatedBudget = await budget.save();
    res.json(updatedBudget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;