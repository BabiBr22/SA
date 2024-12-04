const express = require('express');
const router = express.Router();
const { registrarMovimentacao, listarMovimentacao, registrarDevolucao, listarMovimentacaoSemDevolucao, excluirDevolucao } = require('../controller/Movimentacao')

// Registrar uma Movimentacao
router.post('/', registrarMovimentacao)

// Listar todas as Movimentacaos
router.get('/', listarMovimentacao)

// Listar as movimentacaos que ainda nao foram devolvidas
router.get('/pendentes', listarMovimentacaoSemDevolucao)

// Marcar coluna de data_devolucao para indicar que foi devolvido
router.put('/:id', registrarDevolucao)

// Excluir movimentação
router.delete('/:id', excluirDevolucao)

module.exports = router;
