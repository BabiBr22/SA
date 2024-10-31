const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Funcionario = sequelize.define('Funcionario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  identificacao: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  tableName: 'funcionarios'
});

// Sincroniza o modelo com o banco de dados
Funcionario.sync({ force: false });

module.exports = Funcionario;
