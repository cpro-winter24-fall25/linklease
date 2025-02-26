const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Payment', {
        payment_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        property_id: { type: DataTypes.INTEGER, allowNull: false },
        amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
        payment_status: { type: DataTypes.ENUM('pending', 'completed', 'failed'), defaultValue: 'pending' },
        transaction_id: { type: DataTypes.STRING, allowNull: false, unique: true }
    }, { timestamps: true });
};
