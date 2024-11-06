const express = require('express');
const router = express.Router();
const Funcionario = require('../models/Funcionario');

const {
  cadastrarFuncionario, listarFuncionarios
} = require('../controller/funcionario.js')


// Criar um novo funcionário
router.post('/', cadastrarFuncionario )


// Listar todos os funcionários
router.get('/', listarFuncionarios );


module.exports = router;
