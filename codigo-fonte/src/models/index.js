const path = require('path');
const fs = require('fs');
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const db = {};
const modelsDir = __dirname;

fs.readdirSync(modelsDir)
  .filter((file) => file !== 'index.js' && file.endsWith('.js'))
  .forEach((file) => {
    const modelPath = path.join(modelsDir, file);
    const modelDef = require(modelPath);

    let model;

    // 🧩 Suporte para todos os formatos de model
    if (typeof modelDef === 'function' && !(modelDef.prototype instanceof Model)) {
      // Padrão antigo: exporta uma função (sequelize, DataTypes)
      model = modelDef(sequelize, DataTypes);
    } else if (modelDef.prototype instanceof Model) {
      // Padrão classe: exporta class que estende Model com método initModel()
      if (typeof modelDef.initModel === 'function') {
        model = modelDef.initModel(sequelize);
      } else {
        model = modelDef; // Já é um model pronto
      }
    } else {
      model = modelDef;
    }

    db[model.name] = model;
  });

// 🔹 Chama associações declaradas dentro dos models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 🔹 Associações manuais adicionais (se não estiverem dentro dos models)
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
db.Sequelize = Sequelize;

module.exports = db;
