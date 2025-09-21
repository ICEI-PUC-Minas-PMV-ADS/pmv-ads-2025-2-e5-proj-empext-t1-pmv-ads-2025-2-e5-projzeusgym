const express = require('express');
const cors = require('cors');

const adminLoginRoute = require('./routes/adminLogin');
const adminTestRoute = require('./routes/adminTest');
const adminManageRoute = require('./routes/adminManage'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno no servidor.' });
});

app.get('/', (req, res) => {
  res.json({ message: 'API Zeus executando com êxito!' });
});

app.use('/adminLogin', adminLoginRoute);
app.use('/adminTest', adminTestRoute);
app.use('/admin', adminManageRoute);

module.exports = app;