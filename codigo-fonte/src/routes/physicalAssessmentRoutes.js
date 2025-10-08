const express = require('express');
const router = express.Router();
const physicalAssessmentController = require('../controllers/physicalAssessmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const { upload, handleUploadError } = require('../config/upload');

// Aplicar middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Rota para criar uma nova avaliação física (com upload de arquivo)
router.post('/', upload.single('pdfFile'), handleUploadError, physicalAssessmentController.createPhysicalAssessment);

// Rota para listar todas as avaliações físicas do professor
router.get('/', physicalAssessmentController.getPhysicalAssessments);

// Rota para buscar uma avaliação física específica por ID
router.get('/:assessmentId', physicalAssessmentController.getPhysicalAssessmentById);

// Rota para atualizar uma avaliação física
router.put('/:assessmentId', physicalAssessmentController.updatePhysicalAssessment);

// Rota para excluir uma avaliação física
router.delete('/:assessmentId', physicalAssessmentController.deletePhysicalAssessment);

// Rota para buscar todas as avaliações de um aluno específico
router.get('/student/:studentId', physicalAssessmentController.getStudentAssessments);

// Rota para download de PDF
router.get('/:assessmentId/download', physicalAssessmentController.downloadPDF);

// Rota para visualização de PDF
router.get('/:assessmentId/view', physicalAssessmentController.viewPDF);

module.exports = router;
