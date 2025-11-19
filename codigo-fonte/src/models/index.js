const sequelize = require('../config/database');
const { Sequelize, DataTypes } = require('sequelize');

const Users = require('./Users')(sequelize, DataTypes);
const Exercises = require('./Exercises')(sequelize, DataTypes);
const PhysicalAssessment = require('./PhysicalAssessment')(sequelize, DataTypes);
const TrainingSheet = require('./TrainingSheet')(sequelize, DataTypes);
const TrainingSheetExercises = require('./TrainingSheetExercises')(sequelize, DataTypes);
const Weight = require('./Weight')(sequelize, DataTypes);


if (Users.associate) Users.associate({ Exercises, PhysicalAssessment, TrainingSheet, Weight });
if (Exercises.associate) Exercises.associate({ TrainingSheetExercises });
if (PhysicalAssessment.associate) PhysicalAssessment.associate({ Users });
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
