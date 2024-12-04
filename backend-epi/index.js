// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const epiRoutes = require('./routes/epi');
const funcionarioRoutes = require('./routes/funcionario');
const movimentacaoRoutes = require('./routes/movimentacao');
// const sequelize = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/epis', epiRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/movimentacao', movimentacaoRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('API de Controle de EPIs');
});

// Sincronizar modelos com o banco de dados
// sequelize.sync() // Usa `alter` para ajustar a estrutura das tabelas sem recriá-las

//   .then(() => {
//     console.log('dados sincronizados com sucesso')
//   })
//   .catch(error => {
//     console.error('Erro ao sincronizar o banco de dados:', error);
//   });

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

  module.exports = app;
