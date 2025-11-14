const express = require('express');
const router = express.Router();
const studentAssessmentController= require('../controllers/studentAssessmentController');
const authMiddleware = require('../middlewares/authmiddlewareflexible');

/**
 * Rotas de avaliações físicas para ALUNOS
 * Prefixo: /api/student/assessments
 */

// Listar todas as avaliações do aluno logado
router.get('/', authMiddleware, studentAssessmentController.getMyAssessments);

// Buscar detalhes de uma avaliação específica
router.get('/:assessmentId', authMiddleware, studentAssessmentController.getMyAssessmentById);
    
// Download do PDF da avaliação
router.get('/:assessmentId/download', authMiddleware, studentAssessmentController.downloadMyAssessmentPDF);

module.exports = router;
