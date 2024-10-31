const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Importando a conexão do Sequelize

class EPI extends Model {}

EPI.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'EPI',
});

module.exports = EPI;
