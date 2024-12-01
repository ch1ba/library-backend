const authMiddleware = require('../middleware/authMiddle.js');
module.exports = (app) => {
    const BooksController = require('../controllers/book.controller'); 

    app.get('/api/books',authMiddleware, BooksController.findAll); 

    app.get('/api/books/:id', authMiddleware, BooksController.findOne);

    app.post('/api/createbook', authMiddleware, BooksController.create);

    app.put('/api/updatebook/:id', authMiddleware, BooksController.update);

    app.delete('/api/deletebook/:id', authMiddleware, BooksController.delete);

    app.get('/api/searchbooks', authMiddleware, BooksController.findByTitle); 

};
