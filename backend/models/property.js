const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Property', {
        property_id: { 
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        owner_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        title: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        location: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        price: { 
            type: DataTypes.DECIMAL(10, 2), 
            allowNull: false 
        },
        property_type: { 
            type: DataTypes.ENUM('apartment', 'house', 'condo'),
            allowNull: false,
            get() {
                const value = this.getDataValue('property_type');
                return value.charAt(0).toUpperCase() + value.slice(1);
            },
            set(value) {
                this.setDataValue('property_type', value.toLowerCase());
            }
        },
        forRent: { 
            type: DataTypes.BOOLEAN, 
            defaultValue: true 
        },
        latitude: { 
            type: DataTypes.FLOAT, 
            allowNull: false 
        },
        longitude: { 
            type: DataTypes.FLOAT, 
            allowNull: false 
        },
    }, { 
        timestamps: true 
    });
};
