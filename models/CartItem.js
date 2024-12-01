module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Carts',
          key: 'id',
        },
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Books',
          key: 'id',
        },
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
  
    // Ассоциации
    CartItem.associate = (models) => {
      CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
      CartItem.belongsTo(models.Book, { foreignKey: 'book_id', onDelete: 'CASCADE' });
    };
  
    return CartItem;
  };