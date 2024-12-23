const authMiddleware = require('../middleware/authMiddle.js');
module.exports = (app) => {
    const GenresController = require('../controllers/genre.controller'); 

    app.get('/api/genres',authMiddleware, GenresController.findAll);
    
    app.get('/api/genres/:id',authMiddleware, GenresController.findById); 

};
