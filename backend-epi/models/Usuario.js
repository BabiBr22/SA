const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcrypt');

class Usuario extends Model {
  // Método para verificar a senha
  static async verificarSenha(senha, hash) {
    return await bcrypt.compare(senha, hash);
  }
}

Usuario.init({
  email: { // Altera 'nome' para 'email'
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Adiciona a restrição de unicidade para o email
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Usuario',
  hooks: {
    beforeCreate: async (usuario) => {
      // Hash da senha antes de criar o usuário
      usuario.senha = await bcrypt.hash(usuario.senha, 10);
    }
  }
});

module.exports = Usuario;
