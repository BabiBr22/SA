const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Funcionario extends Model {}

Funcionario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    defaultValue: sequelize.literal(
      "nextval ('seq_id')"
    )
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identificacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Funcionario',
  tableName: 'funcionarios',
});

module.exports = Funcionario;
