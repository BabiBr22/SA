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
  departamento: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'funcionarios'
});

Funcionario.sync({ force: false });

module.exports = Funcionario;
