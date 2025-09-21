const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'professor', 'aluno'),
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATEONLY,  
    allowNull: true,  
  },
  gender: {
    type: DataTypes.ENUM('masculino', 'feminino', 'outro'),
    allowNull: true,
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: true,
    unique: true,
    validate: {
      len: [11, 11],  
    },
  },
  cellphone: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  restriction: {
    type: DataTypes.STRING,
    allowNull: true,  
  },
  cref_mg: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
  },
});

module.exports = Users;