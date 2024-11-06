const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class EPI extends Model {}

EPI.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'EPI', // Nome do modelo
  tableName: 'epis', // Nome da tabela no banco de dados
  underscored: true, // Usado para converter o nome das colunas para snake_case (se desejado)
});

module.exports = EPI;
