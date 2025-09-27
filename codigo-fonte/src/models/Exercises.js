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
    exerGrupo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    comentario: { 
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'exercises',
    timestamps: true,
});

module.exports = Exercises;