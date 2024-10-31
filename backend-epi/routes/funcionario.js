const express = require('express');
const router = express.Router();
const Funcionario = require('../models/Funcionario');

// Criar um novo funcionário
router.post('/', async (req, res) => {
  console.log('Dados recebidos para registro de funcionário:', req.body); // Log dos dados recebidos
  try {
    const funcionario = await Funcionario.create(req.body);
    res.status(201).json(funcionario);
  } catch (error) {
    console.error('Erro ao registrar funcionário:', error); // Log do erro para verificar o que está acontecendo
    res.status(400).json({ error: error.message });
  }
});

// Editar um funcionário
router.put('/:id', async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id);
    if (!funcionario) return res.status(404).json({ error: 'Funcionário não encontrado' });
    await funcionario.update(req.body);
    res.json(funcionario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remover um funcionário
router.delete('/:id', async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id);
    if (!funcionario) return res.status(404).json({ error: 'Funcionário não encontrado' });
    await funcionario.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os funcionários
router.get('/', async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.json(funcionarios);
  } catch (error) {
    console.error('Erro ao listar funcionários:', error); // Log de erro ao listar
    res.status(500).json({ error: 'Erro ao listar funcionários' });
  }
});

module.exports = router;
