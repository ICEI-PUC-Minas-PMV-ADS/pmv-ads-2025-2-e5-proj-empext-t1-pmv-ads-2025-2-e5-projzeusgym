const express = require('express');
const router = express.Router();
const adminManageController = require('../controllers/adminManageController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/professores', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem cadastrar professores.' });
  }
  await adminManageController.createProfessor(req, res);
});

router.post('/alunos', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem cadastrar alunos.' });
  }
  await adminManageController.createAluno(req, res);
});

module.exports = router;