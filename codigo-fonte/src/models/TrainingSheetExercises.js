// models/TrainingSheetExercises.js

const { DataTypes } = require('sequelize');

// Exporta a função que define o modelo
module.exports = (sequelize) => {
    const TrainingSheetExercises = sequelize.define('TrainingSheetExercises', {
        // CRÍTICO: Definindo a PK 'id' (se existir no BD)
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        
        // CRÍTICO: Definindo as Foreign Keys com integridade referencial
        sheetId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'training_sheets',
                key: 'id'
            },
            onDelete: 'CASCADE' // Se ficha for deletada, remove exercícios
        },
        exerciseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'exercises',
                key: 'id'
            },
            onDelete: 'CASCADE' // Se exercício for deletado, remove associações
        },

        // CAMPOS DE DETALHE
        series: {
            type: DataTypes.STRING, 
            allowNull: true,
        },
        repeticoes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        carga: {
            type: DataTypes.FLOAT, 
            allowNull: true,
        },
        descanso: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'N/A' 
        }
        
    }, {
        tableName: 'training_sheet_exercises', // Nome exato da sua tabela no banco de dados
        timestamps: true, // Mantido como true
    });

    return TrainingSheetExercises;
};