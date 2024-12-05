const express = require('express');
const router = express.Router();
const { 
  registrarMovimentacao, 
  listarMovimentacao, 
  registrarDevolucao, 
  listarMovimentacaoSemDevolucao, 
  excluirDevolucao,
  listarHistoricoMovimentacao // Nova função no controller
} = require('../controller/movimentacao');

// Registrar uma Movimentacao
router.post('/', registrarMovimentacao);

// Listar todas as movimentacoes
router.get('/', listarMovimentacao);

// Listar as movimentacoes que ainda nao foram devolvidas
router.get('/pendentes', listarMovimentacaoSemDevolucao);

// Marcar coluna de data_devolucao para indicar que foi devolvido
router.put('/:id', registrarDevolucao);

// Excluir movimentação
router.delete('/:id', excluirDevolucao);

// Listar histórico de movimentação de EPIs (nova rota)
router.get('/historico', listarHistoricoMovimentacao);

module.exports = router;
