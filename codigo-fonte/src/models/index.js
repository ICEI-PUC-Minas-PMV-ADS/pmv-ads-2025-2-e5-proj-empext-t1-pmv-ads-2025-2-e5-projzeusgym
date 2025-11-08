const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// 🔹 Função auxiliar para importar modelos
function loadModel(modelPath) {
  const modelDef = require(modelPath);
  // Se o model exporta uma função, chamamos com (sequelize, DataTypes)
  return typeof modelDef === 'function' ? modelDef(sequelize, DataTypes) : modelDef;
}

// 🔹 Importa todos os models corretamente
const Users = loadModel('./Users');
const Exercises = loadModel('./Exercises');
const Weight = loadModel('./Weight');
const TrainingSheet = loadModel('./TrainingSheet');
const TrainingSheetExercises = loadModel('./TrainingSheetExercises');
const PhysicalAssessment = loadModel('./PhysicalAssessment');

// 🔹 Cria o objeto db
const db = {
  sequelize,
  Users,
  Exercises,
  Weight,
  TrainingSheet,
  TrainingSheetExercises,
  PhysicalAssessment,
};

// 🔹 Executa associações declaradas dentro dos models (ex: TrainingSheet.associate)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 🔹 Associações adicionais globais (caso não estejam nos models)
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

// 🔹 Exporta o objeto db
module.exports = db;
