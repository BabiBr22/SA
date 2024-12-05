const express = require('express');
const router = express.Router();
const funcionarioController = require('../controller/funcionario'); // Verifique se o caminho está correto
const path = require('path');


// Criar um novo funcionário
router.post('/', funcionarioController.cadastrarFuncionario);

// Listar todos os funcionários
// Em routes/funcionario.js
// Em routes/funcionario.js
router.get('/funcionarios', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/funcionarios.html')); // Certifique-se de que o arquivo existe
});
// Editar um funcionário
router.put('/:id', funcionarioController.editarFuncionario);

// Deletar um funcionário
router.delete('/:id', funcionarioController.deletarFuncionario);

module.exports = router;
