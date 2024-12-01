const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Импорт моделей
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Book = require('./Book')(sequelize, Sequelize.DataTypes);
const Review = require('./Review')(sequelize, Sequelize.DataTypes);
const Order = require('./Order')(sequelize, Sequelize.DataTypes);
const OrderItem = require('./OrderItem')(sequelize, Sequelize.DataTypes);
const Cart = require('./Cart')(sequelize, Sequelize.DataTypes);
const CartItem = require('./CartItem')(sequelize, Sequelize.DataTypes);

// Настройка ассоциаций между моделями

// // User ↔ Order (One-to-Many)
// User.hasMany(Order, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// Order.belongsTo(User, { foreignKey: 'user_id' });

// // User ↔ Review (One-to-Many)
// User.hasMany(Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// Review.belongsTo(User, { foreignKey: 'user_id' });

// // Book ↔ Review (One-to-Many)
// Book.hasMany(Review, { foreignKey: 'book_id', onDelete: 'CASCADE' });
// Review.belongsTo(Book, { foreignKey: 'book_id' });

// // User ↔ Cart (One-to-One)
// User.hasOne(Cart, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// Cart.belongsTo(User, { foreignKey: 'user_id' });

// // Cart ↔ CartItem (One-to-Many)
// Cart.hasMany(CartItem, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
// CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

// // Book ↔ CartItem (Many-to-Many через CartItem)
// Book.hasMany(CartItem, { foreignKey: 'book_id', onDelete: 'CASCADE' });
// CartItem.belongsTo(Book, { foreignKey: 'book_id' });

// // Order ↔ OrderItem (One-to-Many)
// Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
// OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// // Book ↔ OrderItem (Many-to-Many через OrderItem)
// Book.hasMany(OrderItem, { foreignKey: 'book_id', onDelete: 'CASCADE' });
// OrderItem.belongsTo(Book, { foreignKey: 'book_id' });

// Экспортируем модели и Sequelize
module.exports = {
  sequelize,
  User,
  Book,
  Review,
  Order,
  OrderItem,
  Cart,
  CartItem,
};