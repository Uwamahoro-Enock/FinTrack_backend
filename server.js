// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const secure = require("./middleware/secure")

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", secure, require("./routes/auth")); // Make sure this is before other routes
app.use("/api/transactions", secure, require("./routes/transactions"));
app.use("/api/budgets", secure, require("./routes/budgets"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));