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

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Property Routes
app.post('/properties', async (req, res) => {
    try {
        const property = await Property.create(req.body);
        res.status(201).json(property);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/properties', async (req, res) => {
    try {
        const properties = await Property.findAll();
        res.status(200).json(properties);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/properties/:id', async (req, res) => {
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

app.put('/properties/:id', async (req, res) => {
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

app.delete('/properties/:id', async (req, res) => {
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

// Payment Routes
app.post('/payments', async (req, res) => {
    try {
        const payment = await Payment.create(req.body);
        res.status(201).json(payment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/payments', async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.status(200).json(payments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/payments/:id', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (payment) {
            res.status(200).json(payment);
        } else {
            res.status(404).json({ error: 'Payment not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/payments/:id', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (payment) {
            await payment.update(req.body);
            res.status(200).json(payment);
        } else {
            res.status(404).json({ error: 'Payment not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/payments/:id', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (payment) {
            await payment.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Payment not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Review Routes
app.post('/reviews', async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (review) {
            await review.update(req.body);
            res.status(200).json(review);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

