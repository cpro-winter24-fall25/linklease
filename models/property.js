const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Property', {
        property_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        owner_id: { type: DataTypes.INTEGER, allowNull: false },
        title: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
        property_type: { type: DataTypes.ENUM('apartment', 'house', 'condo'), allowNull: false }
    }, { timestamps: true });
};
