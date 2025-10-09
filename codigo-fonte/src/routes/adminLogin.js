const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database'); 

// Rota POST para login de administrador
router.post('/login', async (req, res) => {
    const { login, password } = req.body;

    // Consulta SQL: buscar usuário pelo email
    const query = `SELECT id, name, password FROM users WHERE email = ?`;

    try {
        // IMPORTANTE: sequelize.query retorna diretamente um array de objetos
        const results = await sequelize.query(query, {
            replacements: [login],
            type: sequelize.QueryTypes.SELECT
        });

        // Pega o primeiro resultado
        const admin = results.length > 0 ? results[0] : null;

        if (!admin || !admin.password) {
            return res.status(401).json({ message: 'Login ou senha inválidos.' });
        }

        // Logs de depuração
        console.log('-----------------------------------------');
        console.log('DEBUG: TENTATIVA DE LOGIN');
        console.log('Login Recebido:', login);
        console.log('Senha Recebida:', password);
        console.log('Hash no BD:    ', admin.password);
        console.log('-----------------------------------------');

        // Verifica a senha
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            console.warn('Senha incorreta para:', login);
            return res.status(401).json({ message: 'Login ou senha inválidos.' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: admin.id, role: 'admin' },
            process.env.JWT_SECRET || 'SEGREDO_MUITO_SECRETO',
            { expiresIn: '1h' }
        );

        console.log('✅ Login bem-sucedido para:', login);
        res.json({ token, message: 'Login efetuado com sucesso.' });

    } catch (error) {
        console.error('❌ Erro no processamento do login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;
