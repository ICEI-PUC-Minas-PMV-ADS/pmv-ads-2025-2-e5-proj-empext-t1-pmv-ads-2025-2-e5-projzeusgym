const sequelize = require('../config/database');
const { Sequelize, DataTypes } = require('sequelize');

const Users = require('./Users'); // Agora importa o modelo (classe) diretamente
const Exercises = require('./Exercises');
const PhysicalAssessment = require('./PhysicalAssessment');
const TrainingSheet = require('./TrainingSheet');
const TrainingSheetExercises = require('./TrainingSheetExercises');
const Weight = require('./Weight');


// Definir associações diretamente aqui
PhysicalAssessment.belongsTo(Users, { 
  as: 'student', 
  foreignKey: 'studentId',
  onDelete: 'CASCADE'
});
PhysicalAssessment.belongsTo(Users, { 
  as: 'professor', 
  foreignKey: 'professorId',
  onDelete: 'CASCADE'
});

// Outras associações via função associate (se existir)
if (Users.associate) Users.associate({ Exercises, PhysicalAssessment, TrainingSheet, Weight });
if (Exercises.associate) Exercises.associate({ TrainingSheetExercises });
if (TrainingSheet.associate) TrainingSheet.associate({ Users, TrainingSheetExercises });
if (TrainingSheetExercises.associate) TrainingSheetExercises.associate({ TrainingSheet, Exercises });
if (Weight.associate) Weight.associate({ Users });

// Exporta todos os models
const db = {
  sequelize,
  Sequelize,
  Users,
  Exercises,
  PhysicalAssessment,
  TrainingSheet,
  TrainingSheetExercises,
  Weight,
};

module.exports = db;
