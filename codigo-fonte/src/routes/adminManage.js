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

router.get('/professores', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem listar professores.' });
  }
  await adminManageController.listProfessors(req, res);
});

router.get('/professores/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem ver professores.' });
  }
  await adminManageController.getProfessorById(req, res);
});

router.put('/professores/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem atualizar professores.' });
  }
  await adminManageController.updateProfessor(req, res);
});

router.delete('/professores/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem excluir professores.' });
  }
  await adminManageController.deleteProfessor(req, res);
});

router.post('/alunos', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem cadastrar alunos.' });
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
    return res.status(403).json({ error: 'Apenas administradores e professores atualizar os dados de alunos.' });
  }
  await adminManageController.updateAluno(req, res);
});

router.delete('/alunos/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'professor') {
    return res.status(403).json({ error: 'Apenas administradores e professores apagar alunos.' });
  }
  await adminManageController.deleteAluno(req, res);
});

router.put('/exercises', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem cadastrar exercícios.' });
  }
  await adminManageController.createExercise(req, res);
});

router.delete('/exercises/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem deletar exercícios.' });
  }
  await adminManageController.deleteExercise(req, res);
});

router.put('/exercises/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem atualizar exercícios.' });
  }
  await adminManageController.updateExercise(req, res);
});

module.exports = router;