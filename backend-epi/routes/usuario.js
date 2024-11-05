const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const router = express.Router();

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
    const [usuarioCriado, criado] = await Usuario.findOrCreate({
      where: { email: usuario.email },
      defaults: { senha: senhaHash }
    });

    if (!criado) {
      console.log(`Usuário ${usuario.email} já existe.`);
    }
  }
};

// Rota de login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: usuario.id }, 'seu-segredo-jwt', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
});

module.exports = {
  router,
  criarUsuariosFixos,
};
