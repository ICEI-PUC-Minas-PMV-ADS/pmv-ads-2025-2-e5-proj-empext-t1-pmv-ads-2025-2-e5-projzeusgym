const express = require('express');
const router = express.Router();
const adminManageController = require('../controllers/adminManageController');
const authMiddleware = require('../middlewares/authMiddleware');

// ROTAS DE PROFESSORES
router.post('/professores', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem cadastrar professores.' });
  }
  await adminManageController.createProfessor(req, res);
});

router.get('/professores', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem ver os professores.' });
  }
  await adminManageController.listProfessors(req, res);
});

router.get('/professores/:id', authMiddleware, async (req, res) => {
if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem ver os professores.' });
  }
  await adminManageController.getProfessorById(req, res);
});

router.put('/professores/:id', authMiddleware, async (req, res) => {
 if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem ver os professores.' });
  }
  await adminManageController.updateProfessor(req, res);
});

router.delete('/professores/:id', authMiddleware, async (req, res) => {
 if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem ver os professores.' });
  }
  await adminManageController.deleteProfessor(req, res);
});

// ROTAS DE ALUNOS
router.post('/alunos', authMiddleware, async (req, res) => {
 if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem ver os professores.' });
  }
  await adminManageController.createAluno(req, res);
});

router.get('/alunos', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem ver os alunos.' });
  }
  await adminManageController.listAlunos(req, res);
});

router.get('/alunos/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem ver os alunos.' });
  }
  await adminManageController.getAlunoById(req, res);
});

router.put('/alunos/:id', authMiddleware, async (req, res) => {
 if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem ver os professores.' });
  }
  await adminManageController.updateAluno(req, res);
});

router.delete('/alunos/:id', authMiddleware, async (req, res) => {
 if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem ver os professores.' });
  }
  await adminManageController.deleteAluno(req, res);
});

// ROTAS DE EXERCÍCIOS

// 🚨 CORREÇÃO: Rota GET para Listar Exercícios (Necessário para o Front-end!)
router.get('/exercises', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores e professores podem listar exercícios.' });
  }
  // Você precisa garantir que adminManageController tenha o método listExercises
  await adminManageController.listExercises(req, res);
});

router.post('/exercises', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem ver os professores.' });
  }
  await adminManageController.createExercise(req, res);
});

router.delete('/exercises/:id', authMiddleware, async (req, res) => {
 if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem ver os professores.' });
  }
  await adminManageController.deleteExercise(req, res);
});

router.put('/exercises/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem ver os professores.' });
  }
  await adminManageController.updateExercise(req, res);
});

router.get('/exercises', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores podem ver exercícios.' });
  }
  await adminManageController.listExercises(req, res);
});

module.exports = router;