module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    });
  
    // Ассоциации
    Order.associate = (models) => {
      Order.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
      Order.hasMany(models.OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
    };
  
    return Order;
  };