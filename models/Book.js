module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('Book', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        author: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        genre_id: { 
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Genres',
                key: 'id',
            },
        },
        publication_year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        isbn: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
        },
        annotation: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
    });

    // Ассоциации
    Book.associate = (models) => {
      Book.hasMany(models.Review, { foreignKey: 'book_id', onDelete: 'CASCADE' });
      Book.hasMany(models.CartItem, { foreignKey: 'book_id', onDelete: 'CASCADE' });
      Book.hasMany(models.OrderItem, { foreignKey: 'book_id', onDelete: 'CASCADE' });
    };
  
    return Book;
  };