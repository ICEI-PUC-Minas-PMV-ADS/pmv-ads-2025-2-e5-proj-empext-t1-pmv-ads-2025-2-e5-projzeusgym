const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize, DataTypes } = require('sequelize');

// Importar modelos
const UsersModel = require('./Users');
const CarrinhoModel = require('./Carrinho');
const ItemCarrinhoModel = require('./ItemCarrinho');
const ProdutoModel = require('./Produto');

let sequelize;

// Usa variável do Heroku se existir
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql',
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false,
    }
  );
}

// ✅ Inicializa todos os modelos
const Users = UsersModel.init(sequelize, DataTypes);
const Carrinho = CarrinhoModel.init(sequelize, DataTypes);
const ItemCarrinho = ItemCarrinhoModel.init(sequelize, DataTypes);
const Produto = ProdutoModel.init(sequelize, DataTypes);

// ✅ Define associações (apenas se existirem)
if (typeof Users.associate === 'function') Users.associate({ Carrinho });
if (typeof Carrinho.associate === 'function') Carrinho.associate({ Users, ItemCarrinho });
if (typeof ItemCarrinho.associate === 'function') ItemCarrinho.associate({ Carrinho, Produto });
if (typeof Produto.associate === 'function') Produto.associate({ ItemCarrinho });

// Exporta
module.exports = {
  sequelize,
  Sequelize,
  Users,
  Carrinho,
  ItemCarrinho,
  Produto,
};
