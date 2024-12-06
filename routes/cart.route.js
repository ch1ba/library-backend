const authMiddleware = require('../middleware/authMiddle.js');
module.exports = (app) => {
    const CartController = require('../controllers/cart.controller.js');

    app.post('/api/createCart',authMiddleware, CartController.create); 

    app.get('/api/cart/:user_id',authMiddleware, CartController.getCartByUserId); 
};