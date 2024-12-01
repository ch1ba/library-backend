module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
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
      creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  
    // Ассоциации
    Cart.associate = (models) => {
      Cart.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
      Cart.hasMany(models.CartItem, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
    };
  
    return Cart;
  };