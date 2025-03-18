const cors = require('cors');
const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcrypt
const bodyParser = require('body-parser');
require('dotenv').config();
const { User, Property, Payment, Review } = require('./models');
const { router: authRoutes, authenticateToken } = require('./auth'); // Import authentication

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from frontend
app.use(express.json()); // Ensure JSON body parsing

const port = 4001;

// Middleware
app.use(bodyParser.json());

// Use authentication routes
app.use('/auth', authRoutes);

// test of protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.user_id}!` });
});



app.post('/users', authenticateToken, async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // ✅ Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password_hash: hashedPassword, // ✅ Use hashed password
            role
        });

        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/users', authenticateToken, async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/users/:id', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) res.status(200).json(user);
        else res.status(404).json({ error: 'User not found' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/users/:id', authenticateToken, async (req, res) => {
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

app.delete('/users/:id', authenticateToken, async (req, res) => {
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

app.post('/payments', authenticateToken, async (req, res) => {
    try {
        const payment = await Payment.create(req.body);
        res.status(201).json(payment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/payments', authenticateToken, async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.status(200).json(payments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/payments/:id', authenticateToken, async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (payment) res.status(200).json(payment);
        else res.status(404).json({ error: 'Payment not found' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/payments/:id', authenticateToken, async (req, res) => {
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

app.delete('/payments/:id', authenticateToken, async (req, res) => {
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



app.post('/reviews', authenticateToken, async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/reviews', authenticateToken, async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/reviews/:id', authenticateToken, async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (review) res.status(200).json(review);
        else res.status(404).json({ error: 'Review not found' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/reviews/:id', authenticateToken, async (req, res) => {
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

app.delete('/reviews/:id', authenticateToken, async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (review) {
            await review.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.post('/properties', authenticateToken, async (req, res) => {
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
        if (property) res.status(200).json(property);
        else res.status(404).json({ error: 'Property not found' });
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
