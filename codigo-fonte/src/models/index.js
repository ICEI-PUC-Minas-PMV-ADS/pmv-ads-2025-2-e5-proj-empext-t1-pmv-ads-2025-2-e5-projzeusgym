const sequelize = require('../config/database');
const Users = require('./Users'); 

const db = {
  sequelize, 
  Users,     
};

module.exports = db;