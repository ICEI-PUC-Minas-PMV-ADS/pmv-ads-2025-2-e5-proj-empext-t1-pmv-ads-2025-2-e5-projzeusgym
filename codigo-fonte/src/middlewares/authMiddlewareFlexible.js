const jwt = require('jsonwebtoken');

function verifyTokenFlexible(req, res, next) {
  let token = null;
  const authHeader = req.headers['authorization'];

  if (authHeader) token = authHeader.split(' ')[1];
  if (!token && req.query.token) token = req.query.token;
  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('verifyTokenFlexible decoded:', decoded); // debug

    const allowedRoles = ['admin', 'professor', 'aluno', 'student'];
    if (!decoded.role || !allowedRoles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Acesso negado. Função não permitida.' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error('verifyTokenFlexible error:', err.message);
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
}

module.exports = verifyTokenFlexible;