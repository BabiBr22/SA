const express = require('express');
const router = express.Router();
const funcionarioController = require('../controller/funcionario'); // Verifique se o caminho está correto

// Criar um novo funcionário
router.post('/', funcionarioController.cadastrarFuncionario);

// Listar todos os funcionários
router.get('/', funcionarioController.listarFuncionarios);

// Editar um funcionário
router.put('/:id', funcionarioController.editarFuncionario);

// Deletar um funcionário
router.delete('/:id', funcionarioController.deletarFuncionario);

module.exports = router;
