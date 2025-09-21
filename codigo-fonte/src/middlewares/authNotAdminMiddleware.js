const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token ausente.' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findByPk(payload.id);

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    if (user.mustChangePassword) {
      return res.status(403).json({ message: 'Troca de senha obrigatória.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

module.exports = authNotAdminMiddleware;