const express = require('express');
const router = express.Router();
const EPI = require('../models/Epi');

// Criar um novo EPI
router.post('/', async (req, res) => {
  try {
    const epi = await EPI.create(req.body);
    res.status(201).json(epi);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Editar um EPI
router.put('/:id', async (req, res) => {
  try {
    const epi = await EPI.findByPk(req.params.id);
    if (!epi) return res.status(404).json({ error: 'EPI não encontrado' });
    await epi.update(req.body);
    res.json(epi);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remover um EPI
router.delete('/:id', async (req, res) => {
  try {
    const epi = await EPI.findByPk(req.params.id);
    if (!epi) return res.status(404).json({ error: 'EPI não encontrado' });
    await epi.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os EPIs
router.get('/', async (req, res) => {
  const epis = await EPI.findAll();
  res.json(epis);
});

module.exports = router;
