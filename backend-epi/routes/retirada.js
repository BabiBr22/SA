const express = require('express');
const router = express.Router();
const Retirada = require('../models/Retirada');

// Registrar uma retirada
router.post('/', async (req, res) => {
  try {
    const retirada = await Retirada.create(req.body);
    res.status(201).json(retirada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todas as retiradas
router.get('/', async (req, res) => {
  const retiradas = await Retirada.findAll();
  res.json(retiradas);
});

module.exports = router;
