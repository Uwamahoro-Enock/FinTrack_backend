// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
require("dotenv").config();

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth")); // Make sure this is before other routes
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/budgets", require("./routes/budgets"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));