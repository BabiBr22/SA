const Movimentacao = require('../models/Movimentacao');

// Registrar uma movimentacao
exports.registrarMovimentacao = async (req, res) => {
  try {
    console.log(req.body)
    const { 
      funcionarioId, epiId, quantidade 
    } = req.body
    console.log({funcionarioId, epiId, quantidade })
    if(!funcionarioId || !epiId || !quantidade) {
      return res.status(400).json({ error: 'Favor informar funcionarioId, epiId e quantidade'});
    }
    const movimentacao = await Movimentacao.create(req.body);
    res.status(201).json(movimentacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todas as movimentacaos
exports.listarMovimentacao = async (req, res) => {
  const movimentacao = await Movimentacao.findAll();
  res.json(movimentacao);
};

// Listar as movimentacaos que ainda nao foram devolvidas
exports.listarMovimentacaoSemDevolucao = async (req, res) => {
  const movimentacao = await Movimentacao.findAll({ where: { data_devolucao: null }});
  res.json(movimentacao);
};

// Registrar devolução
exports.registrarDevolucao = async (req, res) => {
  try {
    const id = req.params.id
    const devolucao = await Movimentacao.update({ data_devolucao: new Date() }, { where: { id }});
    res.status(201).json({ message: 'Devolucao registrada com sucesso'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Excluir devolucao
exports.excluirDevolucao = async (req, res) => {
  try {
    const id = req.params.id
    await Movimentacao.destroy({ where: { id }});
    res.status(201).json({ message: 'Devolucao excluida com sucesso'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};