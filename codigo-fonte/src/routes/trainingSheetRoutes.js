const express = require('express');
const router = express.Router();
const trainingSheetController = require('../controllers/trainingSheetController');

// 🛑 IMPORTANTE: Utilize seu middleware de autenticação padrão que apenas verifica o token, 
// e não o que restringe a 'admin' (authMiddleware é o padrão mais seguro para essa rota).
const authMiddleware = require('../middlewares/authMiddleware'); 

// Função auxiliar para verificar se a role é permitida (Admin OU Professor)
const hasPermission = (userRole) => userRole === 'professor' || userRole === 'admin';

// ----------------------------------------------------------------------

// ROTA: Criar Ficha de Treino (POST /trainingsheets)
router.post('/', authMiddleware, async (req, res) => {
  if (!hasPermission(req.user.role)) {
    // ✅ CORRIGIDO: Permite Admin e Professor criarem
    return res.status(403).json({ error: 'Acesso negado. Apenas professores e administradores podem criar fichas de treino.' });
  }
  await trainingSheetController.createTrainingSheet(req, res);
});

// ROTA: Adicionar Exercícios à Ficha (POST /trainingsheets/:sheetId/exercises)
router.post('/:sheetId/exercises', authMiddleware, async (req, res) => {
  if (!hasPermission(req.user.role)) {
    // ✅ CORRIGIDO: Permite Admin e Professor gerenciarem exercícios
    return res.status(403).json({ error: 'Acesso negado. Apenas professores e administradores podem gerenciar exercícios da ficha.' });
  }
  await trainingSheetController.addExercisesToSheet(req, res);
});

// ROTA: Listar Fichas de Treino (GET /trainingsheets)
router.get('/', authMiddleware, async (req, res) => {
  if (!hasPermission(req.user.role)) {
    // ✅ CORRIGIDO: Permite Admin e Professor listarem
    return res.status(403).json({ error: 'Acesso negado. Apenas professores e administradores podem ver as fichas.' });
  }
  await trainingSheetController.listTrainingSheets(req, res);
});

// ROTA: Obter Ficha por ID (GET /trainingsheets/:sheetId)
router.get('/:sheetId', authMiddleware, async (req, res) => {
  if (!hasPermission(req.user.role)) {
    // ✅ CORRIGIDO: Permite Admin e Professor verem por ID
    return res.status(403).json({ error: 'Acesso negado. Apenas professores e administradores podem ver suas fichas.' });
  }
  await trainingSheetController.getTrainingSheetById(req, res);
});

// ROTA: Atualizar Ficha (PUT /trainingsheets/:sheetId)
router.put('/:sheetId', authMiddleware, async (req, res) => {
  if (!hasPermission(req.user.role)) {
    // ✅ CORRIGIDO: Permite Admin e Professor atualizarem
    return res.status(403).json({ error: 'Acesso negado. Apenas professores e administradores podem atualizar fichas.' });
  }
  await trainingSheetController.updateTrainingSheet(req, res);
});

// ROTA: Deletar Ficha (DELETE /trainingsheets/:sheetId)
router.delete('/:sheetId', authMiddleware, async (req, res) => {
  if (!hasPermission(req.user.role)) {
    // ✅ CORRIGIDO: Permite Admin e Professor deletarem
    return res.status(403).json({ error: 'Acesso negado. Apenas professores e administradores podem deletar fichas.' });
  }
  await trainingSheetController.deleteTrainingSheet(req, res);
});

module.exports = router;