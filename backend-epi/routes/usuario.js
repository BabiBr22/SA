const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const router = express.Router();


const {
  login, usuario
} = require('../controller/usuario')

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
router.post('/login', login )

// Rota para inicializar usuários fixos (opcional)
router.post('/create', usuario )

module.exports = router;
