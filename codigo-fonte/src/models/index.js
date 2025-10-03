const sequelize = require('../config/database');
const { DataTypes } = require('sequelize'); 
const Users = require('./Users'); 
const Exercises = require('./Exercises');

const db = {
  sequelize, 
  Users,   
  Exercises,  
};

db.TrainingSheet = require('./TrainingSheet')(sequelize, DataTypes);
db.TrainingSheetExercises = require('./TrainingSheetExercises')(sequelize, DataTypes);

// Associações
db.TrainingSheet.belongsToMany(db.Exercises, { through: db.TrainingSheetExercises, foreignKey: 'sheetId', otherKey: 'exerciseId' });
db.Exercises.belongsToMany(db.TrainingSheet, { through: db.TrainingSheetExercises, foreignKey: 'exerciseId', otherKey: 'sheetId' });

module.exports = db;
