const express = require('express');
const router = express.Router();
const Devolucao = require('../models/Devolucao');

const {
  registrarDevolucao, listarDevolucoes
} = require('../controller/devolucao.js')

// Registrar uma devolução
router.post('/', registrarDevolucao)

// Listar todas as devoluções
router.get('/', listarDevolucoes)

module.exports = router;
