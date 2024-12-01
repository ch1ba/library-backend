module.exports = (sequelize, Sequelize) => {
    const Genre = sequelize.define('Genre', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
        },
    });

    // Ассоциации
    Genre.associate = (models) => {
        Genre.hasMany(models.Book, { foreignKey: 'genre_id', onDelete: 'CASCADE' });
    };

    return Genre;
};
