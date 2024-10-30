const { DataTypes } = require('sequelize');
const sequelize = require('../index'); // Importando a instância do Sequelize do seu index.js

const Epi = sequelize.define('Epi', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  validade: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'epis', // Nome da tabela no banco de dados
});

module.exports = Epi;
