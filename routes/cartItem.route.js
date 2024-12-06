const authMiddleware = require('../middleware/authMiddle.js');
module.exports = (app) => {
    const CartItemsController = require('../controllers/cartItems.controller'); 
    
    app.post('/api/createCartItems',authMiddleware, CartItemsController.create);

    app.get('/api/getOrders/:user_id',authMiddleware, CartItemsController.getAllItemsByUserId);

};
