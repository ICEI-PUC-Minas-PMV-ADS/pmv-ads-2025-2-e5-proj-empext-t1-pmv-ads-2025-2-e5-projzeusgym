const { TrainingSheet, Users, Exercises, TrainingSheetExercises } = require('../models');

const normalizeValue = (value) => (value === '' ? null : value);

// =================================================================
// LISTAR FICHAS - Professor/Admin vê suas criadas, Aluno vê as suas
// =================================================================
exports.listTrainingSheets = async (req, res) => {
  try {
    const { id: userId, role } = req.user;

    const whereCondition =
      role === 'aluno' ? { alunoId: userId } : { professorId: userId };

    const sheets = await TrainingSheet.findAll({
      where: whereCondition,
      include: [
        { association: 'aluno', attributes: ['id', 'name', 'email'] },
        {
          association: 'exercises',
          attributes: ['id', 'nome'],
          through: { attributes: ['series', 'repeticoes', 'carga', 'descanso'] },
        },
      ],
    });

    return res.status(200).json(sheets);
  } catch (error) {
    console.error('Erro ao listar fichas:', error);
    return res.status(500).json({ error: 'Erro interno ao listar fichas.' });
  }
};

// =================================================================
// OBTER FICHA POR ID - Professor/Admin/Aluno
// =================================================================
exports.getTrainingSheetById = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const { sheetId } = req.params;

    const whereCondition =
      role === 'aluno'
        ? { id: sheetId, alunoId: userId }
        : { id: sheetId, professorId: userId };

    const sheet = await TrainingSheet.findOne({
      where: whereCondition,
      include: [
        { association: 'aluno', attributes: ['id', 'name', 'email'] },
        {
          association: 'exercises',
          attributes: ['id', 'nome'],
          through: { attributes: ['series', 'repeticoes', 'carga', 'descanso'] },
        },
      ],
    });

    if (!sheet) {
      return res.status(404).json({ error: 'Ficha não encontrada.' });
    }

    return res.status(200).json(sheet);
  } catch (error) {
    console.error('Erro ao buscar ficha por ID:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar ficha.' });
  }
};
