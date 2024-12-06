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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
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
      book_name: {
        type: DataTypes.STRING, // Тип данных для названия книги
        allowNull: false,       // Устанавливаем поле как обязательное
      },
      book_author: {
        type: DataTypes.STRING, // Тип данных для названия книги
        allowNull: false,       // Устанавливаем поле как обязательное
      },
    });
  
    // Ассоциации
    CartItem.associate = (models) => {
      CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
      CartItem.belongsTo(models.Book, { foreignKey: 'book_id', onDelete: 'CASCADE' });
    };
  
    return CartItem;
  };