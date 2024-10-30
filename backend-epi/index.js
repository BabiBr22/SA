const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

// Inicializando o Express e Sequelize (banco de dados)
const app = express();
const sequelize = new Sequelize('postgresql://barbara:ue0bEUWx6_siRJo0Sq_44g@projeto-s-a-2635.jxf.gcp-us-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Definindo o modelo Categoria
const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'categorias', // Nome da tabela no banco de dados
});

// Definindo o modelo EPI
const Epi = sequelize.define('Epi', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: 'id',
    },
    allowNull: false, // garante que um EPI sempre terá uma categoria
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  validade: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'epis', // Nome da tabela no banco de dados
});

// Estabelecendo a relação
Epi.belongsTo(Categoria, { foreignKey: 'categoriaId' });

// Função para criar categorias se não existirem
async function criarCategorias() {
  const categorias = ['Máscaras', 'Luvas', 'Protetores'];
  for (const nome of categorias) {
    const [categoria, created] = await Categoria.findOrCreate({
      where: { nome },
      defaults: { nome },
    });
    if (created) {
      console.log(`Categoria '${nome}' criada!`);
    }
  }
}

// Rota de teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
  res.send('Servidor está funcionando corretamente!');
});

// Rota para cadastrar EPI
app.post('/epis', async (req, res) => {
  const { nome, categoriaId, quantidade, validade } = req.body; // Alterado para categoriaId
  try {
    const epi = await Epi.create({ nome, categoriaId, quantidade, validade }); // Alterado para categoriaId
    res.status(201).json(epi);
  } catch (error) {
    console.error('Erro ao cadastrar EPI:', error);
    res.status(500).json({ error: 'Erro ao cadastrar EPI' });
  }
});

// Rota para editar EPI
app.put('/epis/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, categoriaId, quantidade, validade } = req.body; // Alterado para categoriaId
  try {
    const epi = await Epi.findByPk(id);
    if (epi) {
      await epi.update({ nome, categoriaId, quantidade, validade }); // Alterado para categoriaId
      res.json(epi);
    } else {
      res.status(404).json({ error: 'EPI não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao editar EPI:', error);
    res.status(500).json({ error: 'Erro ao editar EPI' });
  }
});

// Rota para excluir EPI
app.delete('/epis/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Epi.destroy({ where: { id } });
    if (result) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ error: 'EPI não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir EPI:', error);
    res.status(500).json({ error: 'Erro ao excluir EPI' });
  }
});

// Sincronizando com o banco de dados e iniciando o servidor
sequelize.sync({ alter: true }) // Use { alter: true } para ajustar as tabelas sem recriá-las
  .then(async () => {
    await criarCategorias(); // Chama a função para criar categorias
    app.listen(4000, () => {
      console.log('Servidor rodando na porta 4000');
    });
  })
  .catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });
