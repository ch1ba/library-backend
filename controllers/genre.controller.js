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