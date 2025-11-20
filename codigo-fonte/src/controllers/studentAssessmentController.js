const { PhysicalAssessment, Users } = require('../models');
const path = require('path');
const fs = require('fs');

/**
 * Student Assessment Controller
 * Handles assessment-related operations for students
 */

/**
 * Get all assessments for the logged-in student
 */
exports.getMyAssessments = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { dateFrom, dateTo, assessmentType } = req.query;

        const whereClause = { studentId };

        if (dateFrom && dateTo) {
            whereClause.assessmentDate = {
                [require('sequelize').Op.between]: [dateFrom, dateTo]
            };
        }

        if (assessmentType) {
            whereClause.assessmentType = assessmentType;
        }

        const assessments = await PhysicalAssessment.findAll({
            where: whereClause,
            include: [
                {
                    model: Users,
                    as: 'student',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Users,
                    as: 'professor',
                    attributes: ['id', 'name']
                }
            ],
            order: [['assessmentDate', 'DESC']]
        });

        console.log(`[LIST] Found ${assessments.length} assessments for user ${studentId}`);
        if (assessments.length > 0) {
            console.log(`[LIST] Assessment IDs: ${assessments.map(a => a.id).join(', ')}`);
        }

        res.json(assessments);
    } catch (error) {
        console.error('Error fetching student assessments:', error);
        res.status(500).json({ error: 'Erro ao buscar avaliações.' });
    }
};

/**
 * Get specific assessment by ID (only if belongs to student)
 */
exports.getMyAssessmentById = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { assessmentId } = req.params;

        const assessment = await PhysicalAssessment.findOne({
            where: {
                id: assessmentId,
                studentId: studentId
            },
            include: [
                {
                    model: Users,
                    as: 'student',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Users,
                    as: 'professor',
                    attributes: ['id', 'name']
                }
            ]
        });

        if (!assessment) {
            return res.status(404).json({ error: 'Avaliação não encontrada.' });
        }

        res.json(assessment);
    } catch (error) {
        console.error('Error fetching assessment:', error);
        res.status(500).json({ error: 'Erro ao buscar avaliação.' });
    }
};

/**
 * Get assessment summary (latest + stats)
 */
exports.getMyAssessmentSummary = async (req, res) => {
    try {
        const studentId = req.user.id;

        const assessments = await PhysicalAssessment.findAll({
            where: { studentId },
            include: [
                {
                    model: Users,
                    as: 'professor',
                    attributes: ['id', 'name']
                }
            ],
            order: [['assessmentDate', 'DESC']]
        });

        const latest = assessments.length > 0 ? assessments[0] : null;
        const total = assessments.length;

        res.json({
            latest,
            total,
            hasAssessments: total > 0
        });
    } catch (error) {
        console.error('Error fetching assessment summary:', error);
        res.status(500).json({ error: 'Erro ao buscar resumo de avaliações.' });
    }
};

/**
 * Get progress data for charts
 */
exports.getMyProgressData = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { dateFrom, dateTo, dateRange } = req.query;

        let whereClause = { studentId };

        // Handle date range presets
        if (dateRange) {
            const now = new Date();
            let startDate;

            switch (dateRange) {
                case '3months':
                    startDate = new Date(now.setMonth(now.getMonth() - 3));
                    break;
                case '6months':
                    startDate = new Date(now.setMonth(now.getMonth() - 6));
                    break;
                case '1year':
                    startDate = new Date(now.setFullYear(now.getFullYear() - 1));
                    break;
                default:
                    startDate = null;
            }

            if (startDate) {
                whereClause.assessmentDate = {
                    [require('sequelize').Op.gte]: startDate
                };
            }
        } else if (dateFrom && dateTo) {
            whereClause.assessmentDate = {
                [require('sequelize').Op.between]: [dateFrom, dateTo]
            };
        }

        const assessments = await PhysicalAssessment.findAll({
            where: whereClause,
            order: [['assessmentDate', 'ASC']],
            attributes: [
                'id', 'assessmentDate', 'weight', 'height', 'bodyFat', 
                'muscleMass', 'chest', 'waist', 'hip', 'arm', 'thigh', 'calf', 'neck'
            ]
        });

        if (assessments.length === 0) {
            return res.json({
                weight: { data: [], latest: null, previous: null, change: null },
                bodyFat: { data: [], latest: null, previous: null, change: null },
                muscleMass: { data: [], latest: null, previous: null, change: null },
                chest: { data: [], latest: null, previous: null, change: null },
                waist: { data: [], latest: null, previous: null, change: null }
            });
        }

        // Process data for each metric
        const metrics = ['weight', 'bodyFat', 'muscleMass', 'chest', 'waist', 'hip', 'arm', 'thigh', 'calf', 'neck'];
        const progressData = {};

        metrics.forEach(metric => {
            const data = assessments
                .filter(a => a[metric] != null)
                .map(a => ({
                    date: a.assessmentDate,
                    value: parseFloat(a[metric])
                }));

            const latest = data.length > 0 ? data[data.length - 1].value : null;
            const previous = data.length > 1 ? data[data.length - 2].value : null;
            const change = latest && previous ? parseFloat((latest - previous).toFixed(2)) : null;
            const changePercent = latest && previous ? parseFloat(((change / previous) * 100).toFixed(2)) : null;

            progressData[metric] = {
                data,
                latest,
                previous,
                change,
                changePercent
            };
        });

        res.json(progressData);
    } catch (error) {
        console.error('Error fetching progress data:', error);
        res.status(500).json({ error: 'Erro ao buscar dados de progresso.' });
    }
};

/**
 * Download assessment PDF
 */
exports.downloadMyAssessmentPDF = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { assessmentId } = req.params;

    console.log(`[DOWNLOAD] User ${studentId} requesting assessment ${assessmentId}`);

    // First, let's check if the assessment exists at all
    const anyAssessment = await PhysicalAssessment.findOne({
      where: { id: assessmentId }
    });

    if (!anyAssessment) {
      console.log(`[DOWNLOAD] Assessment ${assessmentId} does not exist in database`);
      return res.status(404).json({ error: 'Avaliação não encontrada.' });
    }

    console.log(`[DOWNLOAD] Assessment ${assessmentId} exists, belongs to student ${anyAssessment.studentId}`);

    const assessment = await PhysicalAssessment.findOne({
      where: { id: assessmentId, studentId }
    });

    if (!assessment) {
      console.log(`[DOWNLOAD] Assessment ${assessmentId} found but does not belong to user ${studentId}`);
      return res.status(404).json({ error: 'Avaliação não encontrada.' });
    }
    if (!assessment.filePath) return res.status(404).json({ error: 'Arquivo PDF não disponível.' });

    const filePath = path.isAbsolute(assessment.filePath)
      ? assessment.filePath
      : path.join(__dirname, '../../', assessment.filePath);

    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Arquivo não encontrado no servidor.' });

    const stat = fs.statSync(filePath);
    const fileName = assessment.fileName || 'avaliacao.pdf';

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': stat.size,
      'Content-Disposition': `attachment; filename="${fileName}"`
    });

    const stream = fs.createReadStream(filePath);
    stream.on('error', (err) => {
      console.error('File stream error:', err);
      if (!res.headersSent) return res.status(500).json({ error: 'Erro ao ler o arquivo.' });
      res.end();
    });

    stream.pipe(res);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    res.status(500).json({ error: 'Erro ao fazer download do PDF.' });
  }
};

/**
 * View assessment PDF
 */
exports.viewMyAssessmentPDF = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { assessmentId } = req.params;

        const assessment = await PhysicalAssessment.findOne({
            where: {
                id: assessmentId,
                studentId: studentId
            }
        });

        if (!assessment) {
            return res.status(404).json({ error: 'Avaliação não encontrada.' });
        }

        if (!assessment.filePath) {
            return res.status(404).json({ error: 'Arquivo PDF não disponível.' });
        }

        const filePath = path.join(__dirname, '../../', assessment.filePath);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Arquivo não encontrado no servidor.' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline');
        
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error('Error viewing PDF:', error);
        res.status(500).json({ error: 'Erro ao visualizar PDF.' });
    }
};

module.exports = exports;
