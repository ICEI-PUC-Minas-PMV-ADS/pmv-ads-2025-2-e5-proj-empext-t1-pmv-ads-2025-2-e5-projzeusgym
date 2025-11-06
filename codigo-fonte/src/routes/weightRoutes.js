const express = require('express');
const router = express.Router();
const WeightController = require('../controllers/WeightController');
const authNotAdminMiddleware = require('../middlewares/authNotAdminMiddleware'); 

router.use(authNotAdminMiddleware); 

router.post('/', WeightController.registerWeight);

router.get('/', WeightController.getWeightHistory);

module.exports = router;