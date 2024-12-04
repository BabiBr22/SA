const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Funcionario = require('./Funcionario.js');
const EPI = require('./Epi.js');

class Movimentacao extends Model {}

Movimentacao.init({
  funcionarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: Funcionario,
      key: 'id',
    },
  },
  epiId: {
    type: DataTypes.INTEGER,
    references: {
      model: EPI,
      key: 'id',
    },
  },
  quantidade: {
    type: DataTypes.INTEGER,
  },
  data_retirada: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  data_devolucao: {
    type: DataTypes.DATE,
  }
}, {
  timestamps: false,
  sequelize,
  modelName: 'Movimentacao',
});

module.exports = Movimentacao;
