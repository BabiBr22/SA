const Funcionario = require('../models/Funcionario');
const EPI = require('../models/Epi');

// Atribuir EPI a um funcionário
const atribuirEpiAoFuncionario = async (req, res) => {
  try {
    const { funcionarioId } = req.params;
    const { epiId } = req.body; // ID do EPI que será atribuído

    const funcionario = await Funcionario.findByPk(funcionarioId);
    const epi = await EPI.findByPk(epiId);

    if (!funcionario || !epi) {
      return res.status(404).json({ error: 'Funcionário ou EPI não encontrado' });
    }

    // Atualizar o EPI com o ID do funcionário para criar a associação
    await epi.update({ funcionarioId });
    
    res.status(200).json({ message: 'EPI atribuído ao funcionário com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atribuir EPI ao funcionário' });
  }
};

// Listar EPIs de um funcionário
const listarEpisDoFuncionario = async (req, res) => {
  try {
    const { funcionarioId } = req.params;

    const funcionario = await Funcionario.findByPk(funcionarioId, {
      include: EPI
    });

    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    res.status(200).json(funcionario.EPIs); // Lista de EPIs do funcionário
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar EPIs do funcionário' });
  }
};

module.exports = {
  atribuirEpiAoFuncionario,
  listarEpisDoFuncionario
};
