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
db.PhysicalAssessment = require('./PhysicalAssessment')(sequelize, DataTypes);

// Associações
// 🛑 MODIFICADO: Adicionado 'as: "exercises"' para corrigir seu erro
db.TrainingSheet.belongsToMany(db.Exercises, { through: db.TrainingSheetExercises, foreignKey: 'sheetId', otherKey: 'exerciseId', as: 'exercises' }); 
db.Exercises.belongsToMany(db.TrainingSheet, { through: db.TrainingSheetExercises, foreignKey: 'exerciseId', otherKey: 'sheetId' }); // Pode ou não precisar do alias 'as: "sheets"'

// 🛑 ADICIONADO: Associações BelongsTo para aluno e professor da Ficha de Treino
db.TrainingSheet.belongsTo(db.Users, { as: 'aluno', foreignKey: 'alunoId' });
db.TrainingSheet.belongsTo(db.Users, { as: 'professor', foreignKey: 'professorId' });

// Associações para PhysicalAssessment
db.PhysicalAssessment.belongsTo(db.Users, { as: 'student', foreignKey: 'studentId' });
db.PhysicalAssessment.belongsTo(db.Users, { as: 'professor', foreignKey: 'professorId' });

module.exports = db;