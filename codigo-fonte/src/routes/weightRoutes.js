const express = require('express');
const router = express.Router();
const WeightController = require('../controllers/WeightController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.use(authMiddleware); 

router.post('/', WeightController.registerWeight);

router.get('/', WeightController.getWeightHistory);

module.exports = router;