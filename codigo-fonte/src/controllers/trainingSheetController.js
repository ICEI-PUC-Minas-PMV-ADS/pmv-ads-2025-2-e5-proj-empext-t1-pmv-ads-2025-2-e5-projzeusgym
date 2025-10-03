const { TrainingSheet, Users, Exercises } = require('../models');

exports.createTrainingSheet = async (req, res) => {
  try {
    const { studentId, name, description } = req.body;
    const professorId = req.user.id; 

    const student = await Users.findOne({ where: { id: studentId, role: 'aluno' } });
    if (!student) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    const sheet = await TrainingSheet.create({
    nome: name,          
    descricao: description, 
    professorId,
    alunoId: studentId   
    });

    return res.status(201).json({ message: 'Ficha de treino criada com sucesso!', sheet });
  } catch (error) {
    console.error('Erro ao criar ficha de treino:', error);
    return res.status(500).json({ error: 'Erro interno ao criar ficha de treino.' });
  }
};

exports.addExercisesToSheet = async (req, res) => {
  try {
    const { sheetId } = req.params;
    const { exerciseIds } = req.body; 
    const professorId = req.user.id;

    const sheet = await TrainingSheet.findOne({ where: { id: sheetId, professorId } });
    if (!sheet) {
      return res.status(404).json({ error: 'Ficha de treino não encontrada para este professor.' });
    }

    const exercises = await Exercises.findAll({ where: { id: exerciseIds } });
    if (exercises.length !== exerciseIds.length) {
      return res.status(404).json({ error: 'Um ou mais exercícios não encontrados.' });
    }

    await sheet.addExercises(exercises);

    return res.status(200).json({ message: 'Exercícios adicionados à ficha com sucesso!' });
  } catch (error) {
    console.error('Erro ao adicionar exercícios à ficha:', error);
    return res.status(500).json({ error: 'Erro interno ao adicionar exercícios.' });
  }
};

exports.listTrainingSheets = async (req, res) => {
  try {
    const professorId = req.user.id;

    const sheets = await TrainingSheet.findAll({
      where: { professorId },
      include: [
        { model: Users, as: 'aluno', attributes: ['id', 'name', 'email'] },
        { model: Exercises, attributes: ['id', 'nome'] }
      ]
    });

    return res.status(200).json(sheets);
  } catch (error) {
    console.error('Erro ao listar fichas:', error);
    return res.status(500).json({ error: 'Erro interno ao listar fichas.' });
  }
};

exports.getTrainingSheetById = async (req, res) => {
  try {
    const professorId = req.user.id;
    const { sheetId } = req.params;

    const sheet = await TrainingSheet.findOne({
      where: { id: sheetId, professorId },
      include: [
        { model: Users, as: 'aluno', attributes: ['id', 'name', 'email'] },
        { model: Exercises, attributes: ['id', 'nome'] }
      ]
    });

    if (!sheet) {
      return res.status(404).json({ error: 'Ficha não encontrada para este professor.' });
    }

    return res.status(200).json(sheet);
  } catch (error) {
    console.error('Erro ao buscar ficha por ID:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar ficha.' });
  }
};

exports.updateTrainingSheet = async (req, res) => {
  try {
    const { sheetId } = req.params;
    const { name, description } = req.body;
    const professorId = req.user.id;

    const sheet = await TrainingSheet.findOne({ where: { id: sheetId, professorId } });
    if (!sheet) {
      return res.status(404).json({ error: 'Ficha não encontrada para este professor.' });
    }

    if (name) sheet.nome = name;
    if (description) sheet.descricao = description;

    await sheet.save();

    return res.status(200).json({ message: 'Ficha atualizada com sucesso!', sheet });
  } catch (error) {
    console.error('Erro ao atualizar ficha:', error);
    return res.status(500).json({ error: 'Erro interno ao atualizar ficha.' });
  }
};

exports.deleteTrainingSheet = async (req, res) => {
  try {
    const { sheetId } = req.params;
    const professorId = req.user.id;

    const deletedCount = await TrainingSheet.destroy({ where: { id: sheetId, professorId } });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Ficha não encontrada para exclusão ou você não tem permissão.' });
    }

    return res.status(200).json({ message: 'Ficha deletada com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar ficha:', error);
    return res.status(500).json({ error: 'Erro interno ao deletar ficha.' });
  }
};
