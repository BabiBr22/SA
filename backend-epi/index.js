const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sequelize = require('./db'); // Importe a configuração do banco de dados

// Rotas
const epiRoutes = require('./routes/epi');
const funcionarioRoutes = require('./routes/funcionario');
const movimentacaoRoutes = require('./routes/movimentacao');

// Modelos
const Epi = require('./models/Epi');
const Funcionario = require('./models/Funcionario');
const Movimentacao = require('./models/Movimentacao');

const app = express();
const PORT = process.env.PORT || 4000;

// Configuração de segurança e performance
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // Limite de 100 requisições por IP
});

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'https://seu-dominio.com'], // Configurar origens permitidas
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet()); // Adiciona headers de segurança
app.use(limiter); // Limita número de requisições
app.use(bodyParser.json({
  limit: '1mb' // Limita tamanho do corpo da requisição
}));
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de log (opcional)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Configurar associações
Movimentacao.associate({
  Funcionario,
  EPI: Epi
});

// Rotas
app.use('/epis', epiRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/movimentacao', movimentacaoRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.json({
    message: 'API de Controle de EPIs',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// Middleware de tratamento de erros 404
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.path
  });
});

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Sincronização com o banco de dados
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    // Sincroniza modelos (cuidado em produção)
    await sequelize.sync({ 
      // alter: true // Descomente para atualizar tabelas automaticamente
    });
    
    console.log('Modelos sincronizados com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  }
};

// Inicialização do servidor
const startServer = async () => {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`
      Servidor rodando na porta ${PORT}
      Ambiente: ${process.env.NODE_ENV || 'development'}
      Timestamp: ${new Date().toISOString()}
    `);
  });
};

startServer();

module.exports = app;