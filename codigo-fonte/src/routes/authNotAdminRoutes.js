const express = require('express');
const router = express.Router();
const authController = require('../controllers/authNotAdminController');

router.post('/login', authController.userLogin);

router.post('/change-password', authController.changePassword);

module.exports = router;
