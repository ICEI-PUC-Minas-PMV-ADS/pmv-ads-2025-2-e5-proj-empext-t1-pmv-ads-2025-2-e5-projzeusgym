const jwt = require('jsonwebtoken');

function verifyAdminToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token não fornecido.' });

  const token = authHeader.split(' ')[1]; 
  if (!token) return res.status(401).json({ message: 'Token inválido.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== 'admin' && decoded.role !== 'professor') {
      return res.status(403).json({ message: 'Acesso negado. Somente admins e professores.' });
    }

    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
}

module.exports = verifyAdminToken;
