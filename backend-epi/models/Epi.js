const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class EPI extends Model {}

EPI.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
  modelName: 'EPI',
  tableName: 'epis',
});

module.exports = EPI;
