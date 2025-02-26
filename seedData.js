const { User, Property, Review, Payment, sequelize } = require('./models');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        // Create Users
        const user1 = await User.create({ username: 'john_doe', email: 'john@example.com', password_hash: 'hashedpassword', role: 'buyer' });
        const user2 = await User.create({ username: 'alice_seller', email: 'alice@example.com', password_hash: 'hashedpassword', role: 'seller' });

        // Create Properties
        const property1 = await Property.create({ owner_id: user2.user_id, title: 'Luxury Condo', location: 'New York', price: 250000, property_type: 'condo' });
        const property2 = await Property.create({ owner_id: user2.user_id, title: 'Beachfront Villa', location: 'Miami', price: 500000, property_type: 'house' });

        // Create Reviews
        await Review.create({ user_id: user1.user_id, property_id: property1.property_id, rating: 4.5, review_text: 'Great place to stay!' });
        await Review.create({ user_id: user1.user_id, property_id: property2.property_id, rating: 5.0, review_text: 'Perfect!' });

        // Create Payments
        await Payment.create({ user_id: user1.user_id, property_id: property1.property_id, amount: 250000, payment_status: 'completed', transaction_id: 'TX123456' });
        await Payment.create({ user_id: user2.user_id, property_id: property2.property_id, amount: 50000, payment_status: 'completed', transaction_id: 'TX123457' });

        console.log("Seed data inserted successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        process.exit();
    }
};

// Run Seeding
seedDatabase();
