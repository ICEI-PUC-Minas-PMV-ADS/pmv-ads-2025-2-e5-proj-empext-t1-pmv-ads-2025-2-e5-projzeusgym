const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Importa os modelos (sem invocar como função)
const Users = require('./Users');
const Exercises = require('./Exercises');
const Weight = require('./Weight');
const TrainingSheet = require('./TrainingSheet');
const TrainingSheetExercises = require('./TrainingSheetExercises');
const PhysicalAssessment = require('./PhysicalAssessment');

// Cria o objeto db
const db = {
  sequelize,
  Users,
  Exercises,
  Weight,
  TrainingSheet,
  TrainingSheetExercises,
  PhysicalAssessment,
};

// Associações
db.TrainingSheet.belongsToMany(db.Exercises, {
  through: db.TrainingSheetExercises,
  foreignKey: 'sheetId',
  otherKey: 'exerciseId',
  as: 'exercises',
});

db.Exercises.belongsToMany(db.TrainingSheet, {
  through: db.TrainingSheetExercises,
  foreignKey: 'exerciseId',
  otherKey: 'sheetId',
});

db.TrainingSheet.belongsTo(db.Users, { as: 'aluno', foreignKey: 'alunoId' });
db.TrainingSheet.belongsTo(db.Users, { as: 'professor', foreignKey: 'professorId' });

db.PhysicalAssessment.belongsTo(db.Users, { as: 'student', foreignKey: 'studentId' });
db.PhysicalAssessment.belongsTo(db.Users, { as: 'professor', foreignKey: 'professorId' });

db.Users.hasMany(db.Weight, { foreignKey: 'userId', as: 'weightHistory' });
db.Weight.belongsTo(db.Users, { foreignKey: 'userId', as: 'user' });

module.exports = db;
