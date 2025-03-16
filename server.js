const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { User, Property, Payment, Review } = require('./models');
const { router: authRoutes, authenticateToken } = require('./auth'); // Import authentication

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Use authentication routes
app.use('/auth', authRoutes);

// ✅ Example of a protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.user_id}!` });
});

// ✅ PROTECT PROPERTY ROUTES
app.post('/properties', authenticateToken, async (req, res) => {
    try {
        const property = await Property.create(req.body);
        res.status(201).json(property);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/properties', authenticateToken, async (req, res) => {
    try {
        const properties = await Property.findAll();
        res.status(200).json(properties);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/properties/:id', authenticateToken, async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);
        if (property) {
            res.status(200).json(property);
        } else {
            res.status(404).json({ error: 'Property not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/properties/:id', authenticateToken, async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);
        if (property) {
            await property.update(req.body);
            res.status(200).json(property);
        } else {
            res.status(404).json({ error: 'Property not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/properties/:id', authenticateToken, async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);
        if (property) {
            await property.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Property not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
