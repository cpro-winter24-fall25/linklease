const { syncDatabase } = require('./models');

// Run Database Initialization
syncDatabase().then(() => {
    console.log("Database setup completed!");
    process.exit();
});
