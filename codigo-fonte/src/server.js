const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const db = require('./models/index');

db.sequelize.sync({ alter: true })  
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });