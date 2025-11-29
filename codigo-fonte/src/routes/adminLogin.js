const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database'); 
const authMiddleware = require('../middlewares/authMiddleware');
const adminprofloginController = require('../controllers/adminController');

// Rota POST para login de administrador
router.post('/login', authMiddleware, adminprofloginController.adminLogin);

module.exports = router;
