// src/models/index.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Caminho para o arquivo onde você cria o Sequelize

// Importa os modelos
const Users = require('./Users')(sequelize, DataTypes);
const Exercises = require('./Exercises')(sequelize, DataTypes);
const Weight = require('./Weight')(sequelize, DataTypes);
const TrainingSheet = require('./TrainingSheet')(sequelize, DataTypes);
const TrainingSheetExercises = require('./TrainingSheetExercises')(sequelize, DataTypes);
const PhysicalAssessment = require('./PhysicalAssessment')(sequelize, DataTypes);

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
  as: 'exercises'
});

db.Exercises.belongsToMany(db.TrainingSheet, {
  through: db.TrainingSheetExercises,
  foreignKey: 'exerciseId',
  otherKey: 'sheetId'
});

db.TrainingSheet.belongsTo(db.Users, { as: 'aluno', foreignKey: 'alunoId' });
db.TrainingSheet.belongsTo(db.Users, { as: 'professor', foreignKey: 'professorId' });

db.PhysicalAssessment.belongsTo(db.Users, { as: 'student', foreignKey: 'studentId' });
db.PhysicalAssessment.belongsTo(db.Users, { as: 'professor', foreignKey: 'professorId' });

db.Users.hasMany(db.Weight, { foreignKey: 'userId', as: 'weightHistory' });
db.Weight.belongsTo(db.Users, { foreignKey: 'userId', as: 'user' });

module.exports = db;
