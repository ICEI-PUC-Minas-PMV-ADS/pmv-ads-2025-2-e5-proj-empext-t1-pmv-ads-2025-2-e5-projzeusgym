const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { Op } = require('sequelize');

const adminLogin = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: 'Login e senha são obrigatórios.' });
  }
  try {
    const user = await Users.findOne({
      where: {
        email: login,
        role: { [Op.in]: ['admin', 'professor'] }
      },
      attributes: ['id', 'name', 'email', 'password', 'role', 'mustChangePassword'],
    });
    if (!user) return res.status(403).json({ message: 'Acesso permitido apenas para administradores e professores.' });
    const userPassword = password.trim();
    const isPasswordValid = await bcrypt.compare(userPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }
    if (user.mustChangePassword) {
      const tempToken = jwt.sign(
        { id: user.id, role: user.role, mustChangePassword: true },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );
      return res.status(403).json({
        message: 'Troca de senha obrigatória.',
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
    console.error('Erro no login web:', error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

module.exports = { adminLogin };