// trainingSheetController.js

const { TrainingSheet, Users, Exercises, TrainingSheetExercises } = require('../models');

// Função auxiliar para garantir que strings vazias se tornem null no BD
const normalizeValue = (value) => {
    if (value === '') return null;
    return value;
};

// =================================================================
// 1. CRIAÇÃO DE FICHA (POST)
// =================================================================
exports.createTrainingSheet = async (req, res) => {
    try {
        const { alunoId, nome, descricao, exercises } = req.body;
        const professorId = req.user.id; 

        if (!alunoId || !nome) {
            return res.status(400).json({ 
                error: 'Os campos nome (título da ficha) e alunoId (aluno) são obrigatórios.' 
            });
        }

        const student = await Users.findOne({ where: { id: alunoId, role: 'aluno' } });
        if (!student) {
            return res.status(404).json({ error: 'Aluno não encontrado com o ID fornecido.' });
        }
        
        if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
            return res.status(400).json({ error: 'A ficha deve conter pelo menos um exercício válido.' });
        }

        // 1. Cria a Ficha de Treino
        const sheet = await TrainingSheet.create({
            nome: nome,        
            descricao: descricao || 'Sem descrição', 
            professorId,
            alunoId: alunoId    
        });
        
        
        // 2. Cria as associações detalhadas (tabela pivô)
        if (exercises.length > 0) {
             const newAssociations = exercises.map(ex => ({
                sheetId: sheet.id, 
                exerciseId: ex.exerciseId, 
                // 🎯 Aplica normalização para evitar strings vazias no BD
                series: normalizeValue(ex.series), 
                repeticoes: normalizeValue(ex.repeticoes), 
                carga: normalizeValue(ex.carga),
                descanso: normalizeValue(ex.descanso) || 'N/A',
            }));
            
            await TrainingSheetExercises.bulkCreate(newAssociations);
        }

        // 3. Recarrega a ficha com os detalhes para o retorno
        const createdSheet = await TrainingSheet.findOne({
            where: { id: sheet.id },
            include: [
                { association: 'aluno', attributes: ['id', 'name', 'email'] }, 
                { 
                    association: 'exercises', 
                    attributes: ['id', 'nome'],
                    through: { attributes: ['series', 'repeticoes', 'carga', 'descanso'] } 
                }
            ]
        });

        return res.status(201).json({ 
            message: 'Ficha de treino criada com sucesso!', 
            sheet: createdSheet 
        });
        
    } catch (error) {
        console.error('Erro ao criar ficha de treino:', error);
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ error: 'Erro de chave estrangeira. Um ID de aluno ou exercício não é válido.' });
        }
        return res.status(500).json({ error: 'Erro interno ao criar ficha de treino. Verifique o console do servidor para detalhes.' });
    }
};

// =================================================================
// 2. ADICIONAR EXERCÍCIOS À FICHA (POST) - (Rota auxiliar)
// =================================================================
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

// =================================================================
// 3. LISTAR FICHAS (GET)
// =================================================================
exports.listTrainingSheets = async (req, res) => {
    try {
        const professorId = req.user.id;

        const sheets = await TrainingSheet.findAll({
            where: { professorId },
            include: [
                { 
                    association: 'aluno', 
                    attributes: ['id', 'name', 'email'] 
                }, 
                
                { 
                    association: 'exercises', 
                    attributes: ['id', 'nome'], 
                    through: { attributes: ['series', 'repeticoes', 'carga', 'descanso'] } 
                }
            ]
        });

        return res.status(200).json(sheets);
    } catch (error) {
        console.error('Erro ao listar fichas:', error);
        return res.status(500).json({ error: 'Erro interno ao listar fichas.' });
    }
};

// =================================================================
// 4. OBTER FICHA POR ID (GET)
// =================================================================
exports.getTrainingSheetById = async (req, res) => {
    try {
        const professorId = req.user.id;
        const { sheetId } = req.params;

        const sheet = await TrainingSheet.findOne({
            where: { id: sheetId, professorId },
            include: [
                { 
                    association: 'aluno', 
                    attributes: ['id', 'name', 'email'] 
                }, 
                
                { 
                    association: 'exercises', 
                    attributes: ['id', 'nome'],
                    through: { attributes: ['series', 'repeticoes', 'carga', 'descanso'] } 
                }
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

// =================================================================
// 5. ATUALIZAR FICHA (PUT) - 🎯 Lógica destroy + bulkCreate
// =================================================================
exports.updateTrainingSheet = async (req, res) => {
    try {
        const { sheetId } = req.params;
        const { nome, descricao, exercises } = req.body; 
        const professorId = req.user.id;

        const sheet = await TrainingSheet.findOne({ where: { id: sheetId, professorId } });
        if (!sheet) {
            return res.status(404).json({ error: 'Ficha não encontrada para este professor.' });
        }

        // 1. Atualiza campos simples
        if (nome) sheet.nome = nome;
        if (descricao) sheet.descricao = descricao;
        await sheet.save();

        // 2. Lógica para ATUALIZAR/SUBSTITUIR os exercícios
        if (exercises && Array.isArray(exercises)) {
            
            // PASSO 1 CRÍTICO: Deleta as associações antigas
            await TrainingSheetExercises.destroy({ where: { sheetId: sheet.id } });

            // PASSO 2 CRÍTICO: Cria a lista de novos exercícios formatada
            const newAssociations = exercises.map(ex => ({
                sheetId: sheet.id, 
                exerciseId: ex.exerciseId, 
                // 🎯 Aplica normalização para evitar strings vazias no BD
                series: normalizeValue(ex.series), 
                repeticoes: normalizeValue(ex.repeticoes), 
                carga: normalizeValue(ex.carga),
                descanso: normalizeValue(ex.descanso) || 'N/A',
            }));
            
            // PASSO 3 CRÍTICO: Insere as novas associações
            await TrainingSheetExercises.bulkCreate(newAssociations);
        }

        // 3. Recarrega a ficha com os detalhes para o retorno
        const updatedSheet = await TrainingSheet.findOne({
            where: { id: sheetId },
            include: [
                { association: 'aluno', attributes: ['id', 'name', 'email'] }, 
                { 
                    association: 'exercises', 
                    attributes: ['id', 'nome'],
                    through: { attributes: ['series', 'repeticoes', 'carga', 'descanso'] } 
                }
            ]
        });

        return res.status(200).json({ 
            message: 'Ficha atualizada com sucesso!', 
            sheet: updatedSheet 
        });
        
    } catch (error) {
        console.error('Erro ao atualizar ficha:', error);
        return res.status(500).json({ error: 'Erro interno ao atualizar ficha.' });
    }
};

// =================================================================
// 6. DELETAR FICHA (DELETE)
// =================================================================
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