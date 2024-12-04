const EPI = require('../models/Epi.js'); // Corrigindo o nome da variável para 'EPI'

// Criar um novo EPI
exports.criarNovoEpi = async (req, res) => {
  try {
    const epi = await EPI.create(req.body); // Agora estamos usando 'EPI'
    res.status(201).json(epi);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Editar um EPI
exports.editarEpi = async (req, res) => {
  try {
    const id = req.query.id
    const epi = await EPI.findByPk(id); // Agora estamos usando 'EPI'
    if (!epi) return res.status(404).json({ error: 'EPI não encontrado' });
    await epi.update(req.body, { where: { id }});
    res.json(epi);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remover um EPI
exports.deletarEpi = async (req, res) => {
  try {
    const id = req.query.id
    const epi = await EPI.findByPk(req.params.id); // Agora estamos usando 'EPI'
    if (!epi) return res.status(404).json({ error: 'EPI não encontrado' });
    await epi.destroy({ where: { id }});
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos os EPIs
exports.listarEpis = async (req, res) => {
  try {
    const epis = await EPI.findAll(); // Agora estamos usando 'EPI'
    res.json(epis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar EPIs' });
  }
};
