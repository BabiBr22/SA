const express = require('express');
const router = express.Router();

// Exemplo de rota POST para atribuir EPIs
router.post('/', (req, res) => {
  // lógica para atribuir EPIs
  res.send('EPI atribuído com sucesso');
});

module.exports = router;
