const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize, DataTypes } = require('sequelize');

// Importa todos os models existentes
const UsersModel = require('./Users');
const ExercisesModel = require('./Exercises');
const PhysicalAssessmentModel = require('./PhysicalAssessment');
const TrainingSheetModel = require('./TrainingSheet');
const TrainingSheetExercisesModel = require('./TrainingSheetExercises');
const WeightModel = require('./Weight');

let sequelize;

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

// Inicializa todos os models
const Users = UsersModel(sequelize, DataTypes);
const Exercises = ExercisesModel(sequelize, DataTypes);
const PhysicalAssessment = PhysicalAssessmentModel(sequelize, DataTypes);
const TrainingSheet = TrainingSheetModel(sequelize, DataTypes);
const TrainingSheetExercises = TrainingSheetExercisesModel(sequelize, DataTypes);
const Weight = WeightModel(sequelize, DataTypes);

// Associações (caso existam nos models)
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
