const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { Sequelize, DataTypes } = require('sequelize');

// Configura a conexão com o banco de dados
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql',
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false,
    }
  );
}

// Importa todos os modelos
const UsersModel = require('./Users');
const ExercisesModel = require('./Exercises');
const WeightModel = require('./Weight');
const TrainingSheetModel = require('./TrainingSheet');
const TrainingSheetExercisesModel = require('./TrainingSheetExercises');
const PhysicalAssessmentModel = require('./PhysicalAssessment');

// Inicializa cada modelo com a instância Sequelize
const Users = UsersModel(sequelize, DataTypes);
const Exercises = ExercisesModel(sequelize, DataTypes);
const Weight = WeightModel(sequelize, DataTypes);
const TrainingSheet = TrainingSheetModel(sequelize, DataTypes);
const TrainingSheetExercises = TrainingSheetExercisesModel(sequelize, DataTypes);
const PhysicalAssessment = PhysicalAssessmentModel(sequelize, DataTypes);

// Junta todos os modelos em um objeto db
const db = {
  sequelize,
  Sequelize,
  Users,
  Exercises,
  Weight,
  TrainingSheet,
  TrainingSheetExercises,
  PhysicalAssessment,
};

// Executa automaticamente as associações de cada modelo (se existirem)
Object.values(db).forEach((model) => {
  if (model && typeof model.associate === 'function') {
    model.associate(db);
  }
});

module.exports = db;
