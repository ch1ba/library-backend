const { Genre } = require('../models'); 

exports.findAll = async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.json(genres);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.findById = async (req, res) => {
    const genreId = req.params.id; // Получаем ID жанра из параметров запроса
    try {
        const genre = await Genre.findByPk(genreId); // Находим жанр по ID
        if (!genre) {
            return res.status(404).send('Genre not found'); // Если жанр не найден, возвращаем 404
        }
        res.json(genre.name); // Возвращаем найденный жанр
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};