const express = require('express');
const router = express.Router();
const WeightController = require('../controllers/WeightController');
const authMiddleware = require('../middlewares/authMiddleware'); // Substitua pelo caminho real

// Todas as rotas abaixo requerem que o usuário esteja logado
router.use(authMiddleware); 

// Rota POST: /api/v1/weight
router.post('/', WeightController.registerWeight);

// Rota GET: /api/v1/weight
router.get('/', WeightController.getWeightHistory);

module.exports = router;