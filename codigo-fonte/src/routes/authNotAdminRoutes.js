const express = require('express');
const router = express.Router();
const authController = require('../controllers/authNotAdminController');
const authNotAdminMiddleware = require('../middlewares/authNotAdminMiddleware');

router.post('/login', authController.userLogin);

router.post('/change-password', authController.changePassword);

// Rotas protegidas (requerem autenticação)
router.get('/profile', authNotAdminMiddleware, authController.getProfile)
router.put('/profile', authNotAdminMiddleware, authController.updateProfile)
router.delete('/profile', authNotAdminMiddleware, authController.deleteProfile)

module.exports = router;
