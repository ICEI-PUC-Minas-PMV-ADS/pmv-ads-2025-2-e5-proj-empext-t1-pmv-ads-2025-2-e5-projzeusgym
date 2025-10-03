const express = require('express');
const router = express.Router();
const trainingSheetController = require('../controllers/trainingSheetController');
const authMiddleware = require('../middlewares/authNotAdminMiddleware'); 

router.post('/', authMiddleware, async (req, res) => {
  if (req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas professores podem criar fichas de treino.' });
  }
  await trainingSheetController.createTrainingSheet(req, res);
});

router.post('/:sheetId/exercises', authMiddleware, async (req, res) => {
  if (req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas professores podem gerenciar exercícios da ficha.' });
  }
  await trainingSheetController.addExercisesToSheet(req, res);
});

router.get('/', authMiddleware, async (req, res) => {
  if (req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas professores podem ver suas fichas.' });
  }
  await trainingSheetController.listTrainingSheets(req, res);
});

router.get('/:sheetId', authMiddleware, async (req, res) => {
  if (req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas professores podem ver suas fichas.' });
  }
  await trainingSheetController.getTrainingSheetById(req, res);
});

router.put('/:sheetId', authMiddleware, async (req, res) => {
  if (req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas professores podem atualizar fichas.' });
  }
  await trainingSheetController.updateTrainingSheet(req, res);
});

router.delete('/:sheetId', authMiddleware, async (req, res) => {
  if (req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas professores podem deletar fichas.' });
  }
  await trainingSheetController.deleteTrainingSheet(req, res);
});

module.exports = router;
