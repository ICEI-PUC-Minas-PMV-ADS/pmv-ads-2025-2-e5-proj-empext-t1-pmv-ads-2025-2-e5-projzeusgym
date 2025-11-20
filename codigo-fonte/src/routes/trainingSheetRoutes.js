const express = require('express');
const router = express.Router();
const trainingSheetController = require('../controllers/trainingSheetController');
const authMiddleware = require('../middlewares/authMiddleware');
const authMiddlewareFlexible = require('../middlewares/authMiddlewareFlexible');

const hasPermission = (role) => role === 'professor' || role === 'admin';

// Criar Ficha
router.post('/', authMiddleware, async (req, res) => {
  if (!hasPermission(req.user.role)) {
    return res
      .status(403)
      .json({ error: 'Apenas professores e administradores podem criar fichas.' });
  }
  await trainingSheetController.createTrainingSheet(req, res);
});

// Adicionar exercícios
router.post('/:sheetId/exercises', authMiddleware, async (req, res) => {
  if (!hasPermission(req.user.role)) {
    return res
      .status(403)
      .json({ error: 'Apenas professores e administradores podem alterar fichas.' });
  }
  await trainingSheetController.addExercisesToSheet(req, res);
});

// ✅ Listar fichas (Professor, Admin e Aluno)
router.get('/', authMiddlewareFlexible, async (req, res) => {
  await trainingSheetController.listTrainingSheets(req, res);
});

// ✅ Obter ficha por ID (Professor, Admin e Aluno)
router.get('/:sheetId', authMiddlewareFlexible, async (req, res) => {
  await trainingSheetController.getTrainingSheetById(req, res);
});

// Atualizar ficha
router.put('/:sheetId', authMiddleware, async (req, res) => {
  if (!hasPermission(req.user.role)) {
    return res
      .status(403)
      .json({ error: 'Apenas professores e administradores podem atualizar fichas.' });
  }
  await trainingSheetController.updateTrainingSheet(req, res);
});

// Deletar ficha
router.delete('/:sheetId', authMiddleware, async (req, res) => {
  if (!hasPermission(req.user.role)) {
    return res
      .status(403)
      .json({ error: 'Apenas professores e administradores podem deletar fichas.' });
  }
  await trainingSheetController.deleteTrainingSheet(req, res);
});

module.exports = router;
