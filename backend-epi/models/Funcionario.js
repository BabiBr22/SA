const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ajuste o caminho conforme necessário

class Funcionario extends Model {}

Funcionario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
    allowNull: false, // Mantenha como false se este campo for obrigatório
  },
}, {
  sequelize,
  modelName: 'Funcionario',
  tableName: 'funcionarios',
});

module.exports = Funcionario;
