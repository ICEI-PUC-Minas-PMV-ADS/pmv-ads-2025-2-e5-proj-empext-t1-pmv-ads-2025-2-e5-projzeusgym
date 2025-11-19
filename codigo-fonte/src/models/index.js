const sequelize = require('../config/database');
const { Sequelize, DataTypes } = require('sequelize');

// Definir todos os modelos usando a MESMA instância sequelize
const Users = sequelize.define('Users', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'professor', 'aluno'), allowNull: false },
  birthdate: { type: DataTypes.DATEONLY, allowNull: true },
  gender: { type: DataTypes.ENUM('masculino', 'feminino', 'outro'), allowNull: true },
  cpf: { type: DataTypes.STRING(11), allowNull: true, unique: true, validate: { len: [11, 11] } },
  cellphone: { type: DataTypes.STRING, allowNull: true },
  restriction: { type: DataTypes.STRING, allowNull: true },
  cref_mg: { type: DataTypes.STRING, allowNull: true },
  mustChangePassword: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, { tableName: 'users', timestamps: true });

const Exercises = sequelize.define('Exercises', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  exerGrupo: { type: DataTypes.STRING, allowNull: false },
  comentario: { type: DataTypes.TEXT, allowNull: true }
}, { tableName: 'exercises', timestamps: true });

const PhysicalAssessment = sequelize.define('PhysicalAssessment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  professorId: { type: DataTypes.INTEGER, allowNull: false },
  assessmentDate: { type: DataTypes.DATEONLY, allowNull: false },
  assessmentType: { type: DataTypes.ENUM('inicial', 'trimestral', 'semestral', 'anual'), allowNull: false, defaultValue: 'inicial' },
  fileName: { type: DataTypes.STRING, allowNull: true },
  filePath: { type: DataTypes.STRING, allowNull: true },
  fileUrl: { type: DataTypes.TEXT, allowNull: true },
  blobName: { type: DataTypes.STRING, allowNull: true },
  fileSize: { type: DataTypes.INTEGER, allowNull: true },
  weight: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  height: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  bodyFat: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  muscleMass: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  chest: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  waist: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  hip: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  arm: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  thigh: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  calf: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  neck: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  observations: { type: DataTypes.TEXT, allowNull: true }
}, { tableName: 'physical_assessments', timestamps: true });

const TrainingSheet = sequelize.define('TrainingSheet', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  professorId: { type: DataTypes.INTEGER, allowNull: false },
  alunoId: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'training_sheets', timestamps: true });

const Weight = sequelize.define('Weight', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
  weight: { type: DataTypes.FLOAT, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'weights',
  timestamps: true,
  indexes: [{ fields: ['userId', 'date'] }]
});

const TrainingSheetExercises = require('./TrainingSheetExercises')(sequelize, DataTypes);


// Definir associações diretamente aqui
PhysicalAssessment.belongsTo(Users, { 
  as: 'student', 
  foreignKey: 'studentId',
  onDelete: 'CASCADE'
});
PhysicalAssessment.belongsTo(Users, { 
  as: 'professor', 
  foreignKey: 'professorId',
  onDelete: 'CASCADE'
});

// Associações do TrainingSheet
TrainingSheet.belongsTo(Users, { as: 'professor', foreignKey: 'professorId' });
TrainingSheet.belongsTo(Users, { as: 'aluno', foreignKey: 'alunoId' });
TrainingSheet.belongsToMany(Exercises, { 
  through: TrainingSheetExercises, 
  foreignKey: 'sheetId', 
  otherKey: 'exerciseId',
  as: 'exercises'
});

// Outras associações via função associate (se existir)
if (Users.associate) Users.associate({ Exercises, PhysicalAssessment, TrainingSheet, Weight });
if (Exercises.associate) Exercises.associate({ TrainingSheetExercises });
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
