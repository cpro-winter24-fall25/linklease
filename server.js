const express = require('express');
const bodyParser = require('body-parser');
const { User, Property, Payment, Review } = require('./models');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// User Routes
app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

