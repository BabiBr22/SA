const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');


// Função para criar usuários fixos
const criarUsuariosFixos = async () => {
  const usuariosFixos = [
    { email: 'usuario1@empresa.com', senha: 'senha1' },
    { email: 'usuario2@empresa.com', senha: 'senha2' },
    { email: 'usuario3@empresa.com', senha: 'senha3' },
    { email: 'usuario4@empresa.com', senha: 'senha4' },
    { email: 'usuario5@empresa.com', senha: 'senha5' },
  ];

  for (const usuario of usuariosFixos) {
    const senhaHash = await bcrypt.hash(usuario.senha, 10);
    
    // Tenta encontrar ou criar o usuário
    const [usuarioCriado, criado] = await Usuario.findOrCreate({ 
      where: { email: usuario.email },
      defaults: { senha: senhaHash }
    });

    // Se o usuário já existia, podemos optar por ignorar ou logar
    if (!criado) {
      console.log(`Usuário ${usuario.email} já existe.`);
    }
  }
};

// Rota de login
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Busca o usuário pelo email
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Compara a senha informada com a hash armazenada
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Resposta de sucesso ao login
    res.status(200).json({ message: 'Login realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};

// Rota para inicializar usuários fixos (opcional)
exports.usuario = async (req, res) => {
  try {
    await criarUsuariosFixos();
    res.status(201).json({ message: 'Usuários fixos criados com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar usuários fixos:', error);
    res.status(500).json({ error: 'Erro ao criar usuários fixos' });
  }
};


