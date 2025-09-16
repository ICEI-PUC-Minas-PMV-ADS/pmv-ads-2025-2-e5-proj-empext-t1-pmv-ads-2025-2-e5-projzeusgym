const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const adminLogin = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Login e senha são obrigatórios.' });
  }

  try {
    const admin = await Users.findOne({
      where: { name: login, role: 'admin' },
      attributes: ['id', 'name', 'password', 'role'], 
    });
    if (!admin) return res.status(404).json({ message: 'Admin não encontrado.' });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Senha incorreta.' });

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
    console.error('Erro no login:', error); 
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

module.exports = { adminLogin };