require('dotenv').config(); // Load environment variables
const { Sequelize } = require('sequelize');

// Use environment variables for connection
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);


// Import models
const User = require('./user')(sequelize);
const Property = require('./property')(sequelize);
const Review = require('./review')(sequelize);
const Payment = require('./payment')(sequelize);

// Define Relationships
User.hasMany(Property, { foreignKey: 'owner_id' });
Property.belongsTo(User, { foreignKey: 'owner_id' });

User.hasMany(Review, { foreignKey: 'user_id' });
Property.hasMany(Review, { foreignKey: 'property_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });
Review.belongsTo(Property, { foreignKey: 'property_id' });

User.hasMany(Payment, { foreignKey: 'user_id' });
Property.hasMany(Payment, { foreignKey: 'property_id' });
Payment.belongsTo(User, { foreignKey: 'user_id' });
Payment.belongsTo(Property, { foreignKey: 'property_id' });

// Sync Database
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("Database & tables created!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
};

// Export all models
module.exports = { sequelize, User, Property, Review, Payment, syncDatabase };
