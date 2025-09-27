const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Exercises = sequelize.define('Exercises', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'exercises',
    timestamps: true,
});

module.exports = Exercises;