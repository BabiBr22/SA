const Retirada = require('../models/Retirada');

// Registrar uma retirada
exports.registrarRetirada = async (req, res) => {
  try {
    const retirada = await Retirada.create(req.body);
    res.status(201).json(retirada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todas as retiradas
exports.listarRetiradas = async (req, res) => {
  const retiradas = await Retirada.findAll();
  res.json(retiradas);
};

