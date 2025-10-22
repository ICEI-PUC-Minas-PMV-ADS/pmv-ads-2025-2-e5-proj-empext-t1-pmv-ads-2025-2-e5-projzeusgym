const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Weight = sequelize.define('Weight', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
 
    userId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id',
        },
    },

    weight: {
        type: DataTypes.FLOAT, 
        allowNull: false,
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'weights', 
    timestamps: true,
    indexes: [
        {
            fields: ['userId', 'date'], 
        },
    ],
});

module.exports = Weight;