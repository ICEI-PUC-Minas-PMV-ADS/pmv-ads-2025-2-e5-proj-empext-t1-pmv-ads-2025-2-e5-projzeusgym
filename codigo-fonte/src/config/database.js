const path = require('path'); 
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,   
  process.env.DB_USER,   
  process.env.DB_PASS,   
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,      
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados!');
  } catch (error) {
    console.error('Erro ao conectar no banco de dados:', error);
  }
}

testConnection();


module.exports = sequelize;
