const Devolucao = require('../models/Devolucao');

// Registrar uma devolução
exports.registrarDevolucao = async(req, res) => {
  try {
    const devolucao = await Devolucao.create(req.body);
    res.status(201).json(devolucao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todas as devoluções
exports.listarDevolucoes = async (req, res) => {
  const devolucoes = await Devolucao.findAll();
  res.json(devolucoes);
};


