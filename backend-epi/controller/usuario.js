// Lista de usuários fixos
const usuariosFixos = [
  { email: 'usuario1@empresa.com', senha: 'senha1' },
  { email: 'usuario2@empresa.com', senha: 'senha2' },
  { email: 'usuario3@empresa.com', senha: 'senha3' },
  { email: 'usuario4@empresa.com', senha: 'senha4' },
  { email: 'usuario5@empresa.com', senha: 'senha5' },
];

// Rota de login
exports.login = (req, res) => {
  const { email, senha } = req.body;

  // Verifica se o email e a senha correspondem a um usuário fixo
  const usuarioValido = usuariosFixos.find(
    (usuario) => usuario.email === email && usuario.senha === senha
  );

  if (!usuarioValido) {
    return res.status(401).json({ error: 'Email ou senha inválidos' });
  }

  // Resposta de sucesso ao login
  res.status(200).json({ message: 'Login realizado com sucesso!' });
};
