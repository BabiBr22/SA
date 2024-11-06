const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const EPI = require('./Epi');  // Adicionando o modelo EPI para a relação

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
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Funcionario',
  tableName: 'funcionarios',
});

// Relacionamento entre Funcionario e EPI (1 para N)
Funcionario.hasMany(EPI, { foreignKey: 'funcionarioId' });  // Adiciona a chave estrangeira
EPI.belongsTo(Funcionario, { foreignKey: 'funcionarioId' });

module.exports = Funcionario;
