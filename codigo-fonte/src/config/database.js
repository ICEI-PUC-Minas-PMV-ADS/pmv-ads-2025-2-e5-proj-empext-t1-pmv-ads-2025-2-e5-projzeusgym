const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require('sequelize');

let sequelize;

// CRUCIAL: Se JAWSDB_URL existir (ambiente Heroku), use a URL completa.
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql',
    logging: false,
    // Se o seu Add-on precisar de conexão segura (SSL), descomente as linhas abaixo.
    // O JawsDB às vezes exige:
    // dialectOptions: {
    //   ssl: {
    //     require: true, 
    //     rejectUnauthorized: false
    //   }
    // },
  });
} else {
  // Configuração Local: Usa as variáveis separadas do seu .env
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
