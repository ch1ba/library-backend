module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Books',
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
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  
    // Ассоциации
    Review.associate = (models) => {
      Review.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
      Review.belongsTo(models.Book, { foreignKey: 'book_id', onDelete: 'CASCADE' });
    };
  
    return Review;
  };