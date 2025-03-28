const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Review', {
        review_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        property_id: { type: DataTypes.INTEGER, allowNull: false },
        rating: { type: DataTypes.DECIMAL(2, 1), allowNull: false, validate: { min: 1, max: 5 } },
        review_text: { type: DataTypes.TEXT }
    }, { timestamps: true });
};
