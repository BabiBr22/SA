const Funcionario = require('../models/Funcionario');

// Criar um novo funcionário
exports.cadastrarFuncionario = async (req, res) => {
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
};

// Listar todos os funcionários
exports.listarFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll({ attributes: ['id', 'nome', 'cargo', 'identificacao'] }); // Inclua o campo de identificação aqui, se necessário
    res.json(funcionarios);
  } catch (error) {
    console.error('Erro ao listar funcionários:', error); // Log de erro
    res.status(500).json({ error: 'Erro ao listar funcionários' });
  }
};

// Editar um funcionário
exports.editarFuncionario = async (req, res) => {
  const { id } = req.params;
  const { nome, cargo, identificacao } = req.body; // Os dados a serem atualizados

  try {
    const funcionario = await Funcionario.findByPk(id); // Encontrar o funcionário pelo id

    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado.' }); // Se o funcionário não existir
    }

    // Atualizando os dados do funcionário
    funcionario.nome = nome || funcionario.nome;
    funcionario.cargo = cargo || funcionario.cargo;
    funcionario.identificacao = identificacao || funcionario.identificacao;

    await funcionario.save(); // Salvar as alterações

    res.json(funcionario); // Retornar o funcionário atualizado
  } catch (error) {
    console.error('Erro ao editar funcionário:', error); // Log do erro
    res.status(400).json({ error: error.message });
  }
};

// Deletar um funcionário
exports.deletarFuncionario = async (req, res) => {
  const { id } = req.params;

  try {
    const funcionario = await Funcionario.findByPk(id); // Encontrar o funcionário pelo id

    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado.' }); // Se o funcionário não existir
    }

    await funcionario.destroy(); // Deletar o funcionário

    res.status(200).json({ message: 'Funcionário excluído com sucesso.' }); // Retornar mensagem de sucesso
  } catch (error) {
    console.error('Erro ao deletar funcionário:', error); // Log do erro
    res.status(500).json({ error: 'Erro ao deletar funcionário' });
  }
};
