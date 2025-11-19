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
        { model: Users, as: 'aluno', attributes: ['id', 'name', 'email'] },
        {
          model: Exercises,
          as: 'exercises',
          attributes: ['id', 'nome'],
          through: { 
            model: TrainingSheetExercises,
            attributes: ['series', 'repeticoes', 'carga', 'descanso'] 
          },
        },
      ],
    });

    return res.status(200).json(Array.isArray(sheets) ? sheets : []);

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
        { model: Users, as: 'aluno', attributes: ['id', 'name', 'email'] },
        {
          model: Exercises,
          as: 'exercises',
          attributes: ['id', 'nome'],
          through: { 
            model: TrainingSheetExercises,
            attributes: ['series', 'repeticoes', 'carga', 'descanso'] 
          },
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

// =================================================================
// CRIAR FICHA - Apenas Professor/Admin
// =================================================================
exports.createTrainingSheet = async (req, res) => {
  try {
    const { id: professorId, role } = req.user;

    // Verificar se o usuário é professor ou admin
    if (role === 'aluno') {
      return res.status(403).json({ error: 'Acesso negado. Apenas professores podem criar fichas.' });
    }

    const { alunoId, nome, descricao, exercises } = req.body;

    // Validações básicas
    if (!alunoId) {
      return res.status(400).json({ error: 'ID do aluno é obrigatório.' });
    }

    if (!nome || nome.trim() === '') {
      return res.status(400).json({ error: 'Nome da ficha é obrigatório.' });
    }

    // Verificar se o aluno existe
    const aluno = await Users.findOne({
      where: { id: alunoId, role: 'aluno' }
    });

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }

    // Criar a ficha de treino
    const trainingSheet = await TrainingSheet.create({
      alunoId: normalizeValue(alunoId),
      professorId: professorId,
      nome: normalizeValue(nome),
      descricao: normalizeValue(descricao)
    });

    // Se foram enviados exercícios, associar à ficha
    if (exercises && Array.isArray(exercises) && exercises.length > 0) {
      for (const exercise of exercises) {
        const { exerciseId, series, repeticoes, carga, descanso } = exercise;

        // Verificar se o exercício existe
        const exerciseExists = await Exercises.findByPk(exerciseId);
        if (!exerciseExists) {
          console.warn(`Exercício com ID ${exerciseId} não encontrado. Ignorando.`);
          continue;
        }

        // Criar associação na tabela intermediária
        await TrainingSheetExercises.create({
          sheetId: trainingSheet.id,
          exerciseId: exerciseId,
          series: normalizeValue(series),
          repeticoes: normalizeValue(repeticoes),
          carga: normalizeValue(carga),
          descanso: normalizeValue(descanso)
        });
      }
    }

    // Buscar a ficha criada com todas as associações para retornar
    const createdSheet = await TrainingSheet.findOne({
      where: { id: trainingSheet.id },
      include: [
        { model: Users, as: 'aluno', attributes: ['id', 'name', 'email'] },
        {
          model: Exercises,
          as: 'exercises',
          attributes: ['id', 'nome'],
          through: { 
            model: TrainingSheetExercises,
            attributes: ['series', 'repeticoes', 'carga', 'descanso'] 
          },
        },
      ],
    });

    return res.status(201).json({
      message: 'Ficha de treino criada com sucesso!',
      trainingSheet: createdSheet
    });

  } catch (error) {
    console.error('Erro ao criar ficha de treino:', error);
    return res.status(500).json({ error: 'Erro interno ao criar ficha de treino.' });
  }
};
