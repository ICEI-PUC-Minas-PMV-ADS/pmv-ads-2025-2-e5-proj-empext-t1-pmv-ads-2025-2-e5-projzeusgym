const { PhysicalAssessment, Users } = require('../models');
const fs = require('fs');
const path = require('path');

exports.createPhysicalAssessment = async (req, res) => {
  try {
    const { 
      studentId, 
      assessmentDate, 
      assessmentType,
      observations 
    } = req.body;
    
    const professorId = req.user.id;

    // Verificar se o aluno existe e pertence ao professor
    const student = await Users.findOne({ 
      where: { 
        id: studentId, 
        role: 'aluno' 
      } 
    });
    
    if (!student) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    // Verificar se já existe uma avaliação para o mesmo aluno na mesma data
    const existingAssessment = await PhysicalAssessment.findOne({
      where: {
        studentId,
        assessmentDate
      }
    });

    if (existingAssessment) {
      return res.status(400).json({ 
        error: 'Já existe uma avaliação física para este aluno nesta data.' 
      });
    }

    // Verificar se foi enviado um arquivo
    if (!req.file) {
      return res.status(400).json({ 
        error: 'Arquivo PDF é obrigatório.' 
      });
    }

    const assessment = await PhysicalAssessment.create({
      studentId,
      professorId,
      assessmentDate,
      assessmentType: assessmentType || 'inicial',
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      observations
    });

    // Buscar a avaliação criada com os dados do aluno
    const assessmentWithStudent = await PhysicalAssessment.findOne({
      where: { id: assessment.id },
      include: [
        { model: Users, as: 'student', attributes: ['id', 'name', 'email'] }
      ]
    });

    return res.status(201).json({ 
      message: 'Avaliação física registrada com sucesso!', 
      assessment: assessmentWithStudent 
    });
  } catch (error) {
    console.error('Erro ao criar avaliação física:', error);
    return res.status(500).json({ error: 'Erro interno ao registrar avaliação física.' });
  }
};

exports.getPhysicalAssessments = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const { studentId } = req.query;

    let whereClause = {};
    
    // Se for professor, filtra apenas suas avaliações
    // Se for admin, mostra todas
    if (role === 'professor') {
      whereClause.professorId
= userId;
    }
    
    if (studentId) {
      whereClause.studentId = studentId;
    }

    const assessments = await PhysicalAssessment.findAll({
      where: whereClause,
      include: [
        { model: Users, as: 'student', attributes: ['id', 'name', 'email'] },
        { model: Users, as: 'professor', attributes: ['id', 'name', 'email'] }
      ],
      order: [['assessmentDate', 'DESC']]
    });

    return res.status(200).json(assessments);
  } catch (error) {
    console.error('Erro ao buscar avaliações físicas:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar avaliações físicas.' });
  }
};

exports.getPhysicalAssessmentById = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const professorId = req.user.id;

    const assessment = await PhysicalAssessment.findOne({
      where: { 
        id: assessmentId, 
        professorId 
      },
      include: [
        { model: Users, as: 'student', attributes: ['id', 'name', 'email'] }
      ]
    });

    if (!assessment) {
      return res.status(404).json({ error: 'Avaliação física não encontrada.' });
    }

    return res.status(200).json(assessment);
  } catch (error) {
    console.error('Erro ao buscar avaliação física:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar avaliação física.' });
  }
};

exports.updatePhysicalAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const professorId = req.user.id;
    const updateData = req.body;

    const assessment = await PhysicalAssessment.findOne({
      where: { 
        id: assessmentId, 
        professorId 
      }
    });

    if (!assessment) {
      return res.status(404).json({ error: 'Avaliação física não encontrada.' });
    }

    // Verificar se a data está sendo alterada e se já existe outra avaliação na nova data
    if (updateData.assessmentDate && updateData.assessmentDate !== assessment.assessmentDate) {
      const existingAssessment = await PhysicalAssessment.findOne({
        where: {
          studentId: assessment.studentId,
          assessmentDate: updateData.assessmentDate,
          id: { [require('sequelize').Op.ne]: assessmentId }
        }
      });

      if (existingAssessment) {
        return res.status(400).json({ 
          error: 'Já existe uma avaliação física para este aluno nesta data.' 
        });
      }
    }

    // Atualizar apenas os campos fornecidos
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        assessment[key] = updateData[key];
      }
    });

    await assessment.save();

    // Buscar a avaliação atualizada com os dados do aluno
    const updatedAssessment = await PhysicalAssessment.findOne({
      where: { id: assessment.id },
      include: [
        { model: Users, as: 'student', attributes: ['id', 'name', 'email'] }
      ]
    });

    return res.status(200).json({ 
      message: 'Avaliação física atualizada com sucesso!', 
      assessment: updatedAssessment 
    });
  } catch (error) {
    console.error('Erro ao atualizar avaliação física:', error);
    return res.status(500).json({ error: 'Erro interno ao atualizar avaliação física.' });
  }
};

exports.deletePhysicalAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const professorId = req.user.id;

    // Buscar a avaliação para obter o caminho do arquivo
    const assessment = await PhysicalAssessment.findOne({
      where: { 
        id: assessmentId, 
        professorId 
      }
    });

    if (!assessment) {
      return res.status(404).json({ 
        error: 'Avaliação física não encontrada ou você não tem permissão para excluí-la.' 
      });
    }

    // Excluir o arquivo físico se existir
    if (assessment.filePath && fs.existsSync(assessment.filePath)) {
      try {
        fs.unlinkSync(assessment.filePath);
      } catch (fileError) {
        console.error('Erro ao excluir arquivo:', fileError);
        // Continuar mesmo se não conseguir excluir o arquivo
      }
    }

    // Excluir o registro do banco
    await assessment.destroy();

    return res.status(200).json({ message: 'Avaliação física excluída com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir avaliação física:', error);
    return res.status(500).json({ error: 'Erro interno ao excluir avaliação física.' });
  }
};

exports.getStudentAssessments = async (req, res) => {
  try {
    const { studentId } = req.params;
    const professorId = req.user.id;

    // Verificar se o aluno existe e se o professor tem acesso
    const student = await Users.findOne({
      where: { 
        id: studentId, 
        role: 'aluno' 
      }
    });

    if (!student) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    const assessments = await PhysicalAssessment.findAll({
      where: { 
        studentId, 
        professorId 
      },
      include: [
        { model: Users, as: 'student', attributes: ['id', 'name', 'email'] }
      ],
      order: [['assessmentDate', 'DESC']]
    });

    return res.status(200).json(assessments);
  } catch (error) {
    console.error('Erro ao buscar avaliações do aluno:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar avaliações do aluno.' });
  }
};

exports.downloadPDF = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const professorId = req.user.id;

    const assessment = await PhysicalAssessment.findOne({
      where: { 
        id: assessmentId, 
        professorId 
      },
      include: [
        { model: Users, as: 'student', attributes: ['name'] }
      ]
    });

    if (!assessment) {
      return res.status(404).json({ error: 'Avaliação não encontrada.' });
    }

    if (!assessment.filePath || !fs.existsSync(assessment.filePath)) {
      return res.status(404).json({ error: 'Arquivo PDF não encontrado.' });
    }

    // Gerar nome descritivo para o download
    const studentName = assessment.student.name.replace(/\s+/g, '_').toLowerCase();
    const date = assessment.assessmentDate.replace(/-/g, '');
    const fileName = `avaliacao_${studentName}_${date}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    
    const fileStream = fs.createReadStream(assessment.filePath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Erro ao fazer download do PDF:', error);
    return res.status(500).json({ error: 'Erro interno ao fazer download do arquivo.' });
  }
};

exports.viewPDF = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const professorId = req.user.id;

    const assessment = await PhysicalAssessment.findOne({
      where: { 
        id: assessmentId, 
        professorId 
      }
    });

    if (!assessment) {
      return res.status(404).json({ error: 'Avaliação não encontrada.' });
    }

    if (!assessment.filePath || !fs.existsSync(assessment.filePath)) {
      return res.status(404).json({ error: 'Arquivo PDF não encontrado.' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    
    const fileStream = fs.createReadStream(assessment.filePath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Erro ao visualizar PDF:', error);
    return res.status(500).json({ error: 'Erro interno ao visualizar arquivo.' });
  }
};
