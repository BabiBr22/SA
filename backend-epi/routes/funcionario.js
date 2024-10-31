const express = require('express');
const router = express.Router();
const Funcionario = require('../models/Funcionario');

// Criar um novo funcionário
router.post('/', async (req, res) => {
  console.log('Dados recebidos para registro de funcionário:', req.body); // Log dos dados recebidos
  try {
    const funcionario = await Funcionario.create({
      nome: req.body.nome,
      cargo: req.body.cargo,
      identificacao: req.body.identificacao // Inclua o campo de identificação se necessário
    });
    res.status(201).json(funcionario);
  } catch (error) {
    console.error('Erro ao registrar funcionário:', error); // Log do erro
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os funcionários
router.get('/', async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll({ attributes: ['id', 'nome', 'cargo', 'identificacao'] }); // Inclua o campo de identificação aqui, se necessário
    res.json(funcionarios);
  } catch (error) {
    console.error('Erro ao listar funcionários:', error); // Log de erro
    res.status(500).json({ error: 'Erro ao listar funcionários' });
  }
});

module.exports = router;
