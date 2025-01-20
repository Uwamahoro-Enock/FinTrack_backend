// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for:', email);

        // Find user
        const user = await User.findOne({ email });
        console.log('User found:', !!user);
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Debug password check
        console.log('Attempting password verification...');
        console.log('Stored hash:', user.password);
        console.log('Provided password length:', password.length);
        
        // Try password verification
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log('Password verification result:', isValidPassword);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({
            success: true,
            user: {
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;