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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'O email deve ser único.' // Mensagem de erro personalizada
    },
    validate: {
      isEmail: {
        msg: 'Email inválido.' // Mensagem de erro se o email não for válido
      },
      notEmpty: {
        msg: 'O email não pode estar vazio.' // Mensagem de erro se o campo estiver vazio
      }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'A senha não pode estar vazia.' // Mensagem de erro se o campo estiver vazio
      },
      len: {
        args: [6, 100], // Validação para a senha ter entre 6 e 100 caracteres
        msg: 'A senha deve ter entre 6 e 100 caracteres.'
      }
    }
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
