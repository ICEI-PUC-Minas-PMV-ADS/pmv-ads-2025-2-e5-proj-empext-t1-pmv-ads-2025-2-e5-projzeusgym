const express = require('express');
const router = express.Router();
const verifyAdminToken = require('../middlewares/authMiddleware');

router.get('/dashboard', verifyAdminToken, (req, res) => {
  res.json({ message: `Bem-vindo ao dashboard, admin ${req.user.id}` });
});

module.exports = router;