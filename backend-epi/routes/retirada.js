const express = require('express');
const router = express.Router();
const Retirada = require('../models/Retirada');

const {
  registrarRetirada, listarRetiradas
} = require('../controller/retirada')


// Registrar uma retirada
router.post('/', registrarRetirada )


// Listar todas as retiradas
router.get('/', listarRetiradas )

module.exports = router;
