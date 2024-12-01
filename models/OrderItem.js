module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
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
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
  
    // Ассоциации
    OrderItem.associate = (models) => {
      OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
      OrderItem.belongsTo(models.Book, { foreignKey: 'book_id', onDelete: 'CASCADE' });
    };
  
    return OrderItem;
  };