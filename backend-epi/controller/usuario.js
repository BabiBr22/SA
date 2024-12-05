const bcrypt = require('bcrypt');

// Lista de usuários fixos
const usuariosFixos = [
  { email: 'usuario1@empresa.com', senha: 'senha1' },
  { email: 'usuario2@empresa.com', senha: 'senha2' },
  { email: 'usuario3@empresa.com', senha: 'senha3' },
  { email: 'usuario4@empresa.com', senha: 'senha4' },
  { email: 'usuario5@empresa.com', senha: 'senha5' },
];

// Rota de login
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Busca o usuário na lista de usuários fixos
    const usuarioFixo = usuariosFixos.find((usuario) => usuario.email === email);

    if (!usuarioFixo) {
      return res.status(401).json({ error: 'Usuário não permitido' });
    }

    // Verifica a senha
    if (senha !== usuarioFixo.senha) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Resposta de sucesso ao login
    res.status(200).json({ message: 'Login realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};
