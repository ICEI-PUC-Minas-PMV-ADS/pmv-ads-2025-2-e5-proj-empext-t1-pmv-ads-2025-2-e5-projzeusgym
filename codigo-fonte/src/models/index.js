const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize, DataTypes } = require('sequelize');


let sequelize; // A variável sequelize será definida abaixo

// Configuração do banco (Heroku ou local)
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql',
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false,
    }
  );
}

// Inicializar modelos com sequelize
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
