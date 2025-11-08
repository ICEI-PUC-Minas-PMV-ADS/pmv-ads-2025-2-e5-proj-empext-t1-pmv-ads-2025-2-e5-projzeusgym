const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const db = {};

// Caminho da pasta de models
const modelsDir = __dirname;

// Carrega todos os models dinamicamente
fs.readdirSync(modelsDir)
  .filter((file) => file !== 'index.js' && file.endsWith('.js'))
  .forEach((file) => {
    const modelPath = path.join(modelsDir, file);
    const modelDef = require(modelPath);

    let model;

    // 🔹 Suporte para os dois padrões de exportação
    if (typeof modelDef === 'function' && !(modelDef.prototype instanceof sequelize.Model)) {
      // Forma antiga: exporta uma função (sequelize, DataTypes)
      model = modelDef(sequelize, DataTypes);
    } else if (modelDef.prototype instanceof sequelize.Model) {
      // Forma moderna: classe estende Model
      model = modelDef.initModel(sequelize);
    } else {
      // Já é um model definido
      model = modelDef;
    }

    db[model.name] = model;
  });

// 🔹 Configura associações (se existirem)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 🔹 Associações extras específicas (se não estiverem dentro dos models)
if (db.TrainingSheet && db.Exercises && db.TrainingSheetExercises) {
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
}

if (db.TrainingSheet && db.Users) {
  db.TrainingSheet.belongsTo(db.Users, { as: 'aluno', foreignKey: 'alunoId' });
  db.TrainingSheet.belongsTo(db.Users, { as: 'professor', foreignKey: 'professorId' });
}

if (db.PhysicalAssessment && db.Users) {
  db.PhysicalAssessment.belongsTo(db.Users, { as: 'student', foreignKey: 'studentId' });
  db.PhysicalAssessment.belongsTo(db.Users, { as: 'professor', foreignKey: 'professorId' });
}

if (db.Users && db.Weight) {
  db.Users.hasMany(db.Weight, { foreignKey: 'userId', as: 'weightHistory' });
  db.Weight.belongsTo(db.Users, { foreignKey: 'userId', as: 'user' });
}

db.sequelize = sequelize;

module.exports = db;
