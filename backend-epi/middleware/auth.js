const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token.split(' ')[1], 'sua_chave_secreta', (err, decoded) => { // Adiciona .split para obter o token após "Bearer"
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.userId = decoded.id; // Armazena o ID do usuário decodificado
    next();
  });
};

module.exports = auth;
