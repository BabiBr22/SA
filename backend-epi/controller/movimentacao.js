const Movimentacao = require('../models/Movimentacao');
const Funcionario = require('../models/Funcionario'); // Certifique-se de ajustar o caminho para seu modelo
const Epi = require('../models/Epi'); // Certifique-se de ajustar o caminho para seu modelo

// Registrar uma movimentacao
exports.registrarMovimentacao = async (req, res) => {
  try {
    console.log(req.body);
    const { funcionarioId, epiId, quantidade } = req.body;
    console.log({ funcionarioId, epiId, quantidade });

    if (!funcionarioId || !epiId || !quantidade) {
      return res.status(400).json({ error: 'Favor informar funcionarioId, epiId e quantidade' });
    }
    
    const movimentacao = await Movimentacao.create(req.body);
    res.status(201).json(movimentacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todas as movimentacoes
exports.listarMovimentacao = async (req, res) => {
  try {
    const movimentacao = await Movimentacao.findAll();
    res.json(movimentacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar as movimentacoes que ainda nao foram devolvidas
exports.listarMovimentacaoSemDevolucao = async (req, res) => {
  try {
    const movimentacao = await Movimentacao.findAll({ where: { data_devolucao: null } });
    res.json(movimentacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Registrar devolução
exports.registrarDevolucao = async (req, res) => {
  try {
    const id = req.params.id;
    const devolucao = await Movimentacao.update({ data_devolucao: new Date() }, { where: { id } });
    res.status(201).json({ message: 'Devolucao registrada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Excluir devolucao
exports.excluirDevolucao = async (req, res) => {
  try {
    const id = req.params.id;
    await Movimentacao.destroy({ where: { id } });
    res.status(201).json({ message: 'Devolucao excluida com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar histórico de movimentação de EPIs (nova função)
exports.listarHistoricoMovimentacao = async (req, res) => {
  try {
    const movimentacao = await Movimentacao.findAll({
      include: [
        {
          model: Funcionario,
          attributes: ['nome']
        },
        {
          model: Epi,
          attributes: ['nome']
        }
      ],
      order: [['data_hora', 'DESC']]
    });

    // Formatar os dados de saída
    const resultado = movimentacao.map(mov => ({
      data_hora: mov.data_hora,
      funcionarioNome: mov.Funcionario.nome,
      epiNome: mov.Epi.nome
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Erro ao buscar histórico de movimentação:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
