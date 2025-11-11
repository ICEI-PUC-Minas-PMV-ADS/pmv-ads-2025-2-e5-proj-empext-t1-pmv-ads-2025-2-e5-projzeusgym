
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { Op } = require('sequelize'); 

const userLogin = async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ message: 'Login e senha s�o obrigat�rios.' });
    }

    try {

        const user = await Users.findOne({
            where: { 
                email: login, 
                role: { [Op.in]: ['professor', 'aluno'] } 
            },
            attributes: ['id', 'name', 'email', 'password', 'role', 'mustChangePassword'],
        });
        if (!user) return res.status(404).json({ message: 'Usu�rio n�o encontrado.' });
          const userPassword = password.trim();

        const isPasswordValid = await bcrypt.compare(userPassword, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Senha incorreta.' });

        if (user.mustChangePassword) {
            const tempToken = jwt.sign(
                { id: user.id, role: user.role, mustChangePassword: true },
                process.env.JWT_SECRET,
                { expiresIn: '15m' }
            );
            return res.status(403).json({
                message: 'Troca de senha obrigat�ria.',
                tempToken,
            });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({ message: 'Login bem-sucedido!', token });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

const changePassword = async (req, res) => {
    const { newPassword } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!newPassword) {
        return res.status(400).json({ message: 'Nova senha � obrigat�ria.' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (!payload.mustChangePassword) {
            
            return res.status(403).json({ message: 'Acesso negado para troca de senha.' });
        }

        const user = await Users.findByPk(payload.id);
        if (!user) return res.status(404).json({ message: 'Usu�rio n�o encontrado.' });
       

        user.password = await bcrypt.hash(newPassword, 10);
        user.mustChangePassword = false;
        await user.save();

        return res.json({ message: 'Senha alterada com sucesso.' });
    } catch (error) {
        return res.status(401).json({ message: 'Token inv�lido ou expirado.' });
    }
};

module.exports = { userLogin, changePassword };