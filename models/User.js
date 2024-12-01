const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define('User', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
  
    // Ассоциации
    User.associate = (models) => {
      User.hasMany(models.Order, { foreignKey: 'user_id', onDelete: 'CASCADE' });
      User.hasMany(models.Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });
      User.hasOne(models.Cart, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    };
  
    return User;
  };