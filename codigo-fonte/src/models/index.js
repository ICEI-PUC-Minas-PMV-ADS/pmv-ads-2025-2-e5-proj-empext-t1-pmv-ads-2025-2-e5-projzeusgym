const sequelize = require('../config/database');
const Users = require('./Users'); 
const Exercises = require('./Exercises');

const db = {
  sequelize, 
  Users,   
  Exercises,  
};

module.exports = db;