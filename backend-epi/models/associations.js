const Funcionario = require('./Funcionario'); // Certifique-se de que o arquivo Funcionario.js está no mesmo diretório
const EPI = require('./Epi'); // Certifique-se de que o arquivo Epi.js está no mesmo diretório

// Define a relação muitos-para-muitos entre Funcionário e EPI com a tabela intermediária 'funcionarios_epis'
Funcionario.belongsToMany(EPI, { through: 'funcionarios_epis', foreignKey: 'funcionarioId' });
EPI.belongsToMany(Funcionario, { through: 'funcionarios_epis', foreignKey: 'epiId' });

module.exports = { Funcionario, EPI };
