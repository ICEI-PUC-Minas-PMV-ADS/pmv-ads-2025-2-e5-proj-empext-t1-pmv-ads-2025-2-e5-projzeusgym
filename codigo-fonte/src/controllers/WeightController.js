const Weight = require('../models/Weight');
// Importe o seu middleware de erro se tiver um

// 1. Registrar um novo peso
exports.registerWeight = async (req, res) => {
    // ⚠️ ALERTA: Ajuste para como o ID do usuário é anexado pelo seu middleware ⚠️
    const userId = req.user.id; // Ex: Se o ID estiver em req.user.id
    const { weight, date } = req.body; // 'date' é opcional se usar o default

    try {
        if (!userId) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        if (!weight || isNaN(parseFloat(weight)) || parseFloat(weight) <= 0) {
            return res.status(400).json({ error: 'O peso é obrigatório e deve ser um número positivo.' });
        }

        const newWeightEntry = await Weight.create({
            userId: userId,
            weight: parseFloat(weight),
            // Usa a data fornecida ou a data padrão do Sequelize (NOW)
            date: date || new Date(), 
        });

        return res.status(201).json(newWeightEntry);

    } catch (error) {
        console.error('Erro ao registrar peso (Sequelize):', error);
        return res.status(500).json({ error: 'Erro interno do servidor ao salvar o peso.' });
    }
};

// 2. Buscar histórico de peso do usuário
exports.getWeightHistory = async (req, res) => {
    // ⚠️ ALERTA: Ajuste para como o ID do usuário é anexado pelo seu middleware ⚠️
    const userId = req.user.id; // Ex: Se o ID estiver em req.user.id

    try {
        if (!userId) {
            return res.status(401).json({ error: 'Usuário não autenticado.' });
        }
        
        // Busca todos os registros de peso para este usuário
        const history = await Weight.findAll({
            where: { userId: userId },
            order: [
                ['date', 'DESC'] // Ordena do mais recente (DESC) para o mais antigo
            ],
            attributes: ['id', 'weight', 'date', 'createdAt'] // Seleciona apenas campos relevantes
        });

        return res.status(200).json(history);
        
    } catch (error) {
        console.error('Erro ao buscar histórico de peso (Sequelize):', error);
        return res.status(500).json({ error: 'Erro interno do servidor ao buscar o histórico.' });
    }
};