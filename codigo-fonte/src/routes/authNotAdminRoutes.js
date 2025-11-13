const express = require('express')
const router = express.Router()
const authController = require('../controllers/authNotAdminController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/login', authController.userLogin)
router.post('/change-password', authController.changePassword)

// Rotas protegidas (requerem autenticação)
router.get('/profile', authMiddleware, authController.getProfile)
router.put('/profile', authMiddleware, authController.updateProfile)
router.delete('/profile', authMiddleware, authController.deleteProfile)

module.exports = router
