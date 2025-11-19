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

    console.log(`[DEBUG] Buscando ficha ID: ${sheetId} para usuário: ${userId} (${role})`);

    const whereCondition =
      role === 'aluno'
        ? { id: sheetId, alunoId: userId }
        : { id: sheetId, professorId: userId };

    console.log('[DEBUG] Where condition:', whereCondition);

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
      console.log('[DEBUG] Ficha não encontrada');
      return res.status(404).json({ error: 'Ficha não encontrada.' });
    }

    console.log('[DEBUG] Ficha encontrada:', {
      id: sheet.id,
      nome: sheet.nome,
      exercisesCount: sheet.exercises ? sheet.exercises.length : 0
    });

    // Debug: verificar se há exercícios na tabela intermediária
    const exercisesInTable = await TrainingSheetExercises.findAll({
      where: { sheetId: sheet.id }
    });
    console.log(`[DEBUG] Exercícios na tabela intermediária para ficha ${sheet.id}:`, exercisesInTable.length);

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

    console.log(`[DEBUG CREATE] Ficha ${trainingSheet.id} criada. Processando ${exercises ? exercises.length : 0} exercícios.`);

    // Se foram enviados exercícios, associar à ficha
    if (exercises && Array.isArray(exercises) && exercises.length > 0) {
      console.log('[DEBUG CREATE] Exercícios recebidos:', exercises);
      
      for (let i = 0; i < exercises.length; i++) {
        const exercise = exercises[i];
        const { exerciseId, series, repeticoes, carga, descanso } = exercise;

        console.log(`[DEBUG CREATE] Processando exercício ${i + 1}:`, {
          exerciseId, series, repeticoes, carga, descanso
        });

        // Verificar se o exercício existe
        const exerciseExists = await Exercises.findByPk(exerciseId);
        if (!exerciseExists) {
          console.warn(`[DEBUG CREATE] Exercício com ID ${exerciseId} não encontrado. Ignorando.`);
          continue;
        }

        console.log(`[DEBUG CREATE] Exercício ${exerciseId} encontrado: ${exerciseExists.nome}`);

        // Criar associação na tabela intermediária
        const association = await TrainingSheetExercises.create({
          sheetId: trainingSheet.id,
          exerciseId: exerciseId,
          series: normalizeValue(series),
          repeticoes: normalizeValue(repeticoes),
          carga: normalizeValue(carga),
          descanso: normalizeValue(descanso)
        });

        console.log(`[DEBUG CREATE] Associação criada:`, association.toJSON());
      }
    } else {
      console.log('[DEBUG CREATE] Nenhum exercício foi enviado ou array está vazio.');
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
