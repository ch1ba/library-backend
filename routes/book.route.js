const authMiddleware = require('../middleware/authMiddle.js');
module.exports = (app) => {
    const BooksController = require('../controllers/book.controller'); 

    app.get('/api/books', BooksController.findAll); 

    app.get('/api/books/:id', BooksController.findOne);

    app.post('/api/createbook', BooksController.create);

    app.put('/api/updatebook/:id', BooksController.update);

    app.delete('/api/deletebook/:id', BooksController.delete);

    app.get('/api/searchbooks', BooksController.findByTitle); 

};
