const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Funcionario = require('./Funcionario');
const EPI = require('./Epi.js');

class Retirada extends Model {}

Retirada.init({
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
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Retirada',
});

module.exports = Retirada;
