const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { User } = require('./models');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied, token missing or invalid' });
    }

    const token = authHeader.split(" ")[1]; // Extract only the token (removes "Bearer ")

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });

        req.user = user; // Attach user info to request
        next();
    });
};

// User Registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password_hash: hashedPassword, role });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// User Login - This is where the token is generated
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate the JWT token correctly (WITHOUT "Bearer")
        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        console.log(token);
        res.status(200).json({ token }); // Only return the token, no "Bearer"
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = { router, authenticateToken };
