const cors = require('cors');
const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcrypt
const bodyParser = require('body-parser');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { User, Property, Payment, Review } = require('./models');
const { router: authRoutes, authenticateToken } = require('./auth'); // Import authentication

const app = express();
// Enable CORS with credentials
app.use(cors({
    origin: 'http://localhost:3000', // Allow the frontend to connect
    credentials: true // Allow credentials (cookies, authentication headers)
}));
app.use(express.json()); // Ensure JSON body parsing

const port = 4000;

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

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password_hash: hashedPassword, // Use hashed password
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

app.get('/reviews', async (req, res) => {
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
        const properties = await Property.findAll({
            where: { forRent: true } // Only return properties that are for rent
        });
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


// Stripe Checkout Endpoint
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { propertyId, price, title } = req.body;

        const successUrl = `http://localhost:3000/success?propertyId=${propertyId}`; // Passing propertyId in success URL
        const cancelUrl = `http://localhost:3000/cancel`; // Redirects to the cancel page

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'cad',
                        product_data: {
                            name: title,  // Property title
                        },
                        unit_amount: Math.round(price * 100), // Convert price to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
        });

        // Return the session URL to the client
        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe checkout session creation error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Endpoint to update property status after successful payment
app.post('/update-property-status', async (req, res) => {
    try {
        const { propertyId } = req.body;

        // Find the property by its ID
        const property = await Property.findByPk(propertyId);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        // Update the 'forRent' status to false
        property.forRent = false;
        await property.save(); // Save the updated property to the database

        res.json({ message: "Property status updated successfully" });
    } catch (error) {
        console.error("Error updating property status:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/get-session-details", async (req, res) => {
    const { sessionId } = req.query;
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        res.json(session);
    } catch (error) {
        console.error("Error retrieving session:", error);
        res.status(500).send("Error retrieving session details.");
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
