const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const epiRoutes = require('./routes/epi');
const funcionarioRoutes = require('./routes/funcionario');
const retiradaRoutes = require('./routes/retirada');
const devolucaoRoutes = require('./routes/devolucao');
const usuarioRoutes = require('./routes/usuario'); // Adicionando rotas de usuários
const sequelize = require('./db'); // Importando a conexão com o banco

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/epis', epiRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/retiradas', retiradaRoutes);
app.use('/devolucoes', devolucaoRoutes);
app.use('/usuarios', usuarioRoutes); // Usando rotas de usuários
app.use('/usuarios', usuarioRoutes); // Usando rotas de usuários


// Rota padrão
app.get('/', (req, res) => {
  res.send('API de Controle de EPIs');
});

// Sincronizar modelos com o banco de dados
sequelize.sync({ force: true }) // Use com cuidado, isso recria as tabelas
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });
