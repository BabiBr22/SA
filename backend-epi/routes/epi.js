const express = require('express');
const router = express.Router();
const {
  criarNovoEpi, 
  editarEpi,  
  deletarEpi, 
  listarEpis
} = require('../controller/epi.js');

// Criar um novo EPI
router.post('/', criarNovoEpi);

// Editar um EPI
router.put('/:id', editarEpi);

// Remover um EPI
router.delete('/:id', deletarEpi);

// Listar todos os EPIs
router.get('/atribuirEpis', listarEpis);

module.exports = router;
