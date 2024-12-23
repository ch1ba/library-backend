const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Genre = require('./Genre')(sequelize, Sequelize.DataTypes);
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Book = require('./Book')(sequelize, Sequelize.DataTypes);
const Review = require('./Review')(sequelize, Sequelize.DataTypes);
const Order = require('./Order')(sequelize, Sequelize.DataTypes);
const OrderItem = require('./OrderItem')(sequelize, Sequelize.DataTypes);
const Cart = require('./Cart')(sequelize, Sequelize.DataTypes);
const CartItem = require('./CartItem')(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  Genre,
  User,
  Book,
  Review,
  Order,
  OrderItem,
  Cart,
  CartItem,
};