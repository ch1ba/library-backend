const { CartItem } = require('../models'); // Импортируйте вашу модель CartItem

exports.create = async (req, res) => {
    // Извлекаем данные из тела запроса
    const { cart_id, user_id, book_id, book_name, book_author } = req.body;

    try {
        // Создаем новую запись в таблице CartItems
        const newCartItem = await CartItem.create({
            cart_id,
            user_id,
            book_id,
            book_name,
            book_author
        });

        // Отправляем ответ с созданным элементом корзины
        res.status(201).json(newCartItem);
    } catch (error) {
        console.error('Ошибка при создании элемента корзины:', error);
        res.status(500).json({ error: 'Не удалось создать элемент корзины' });
    }
};



exports.getAllItemsByUserId = async (req, res) => {
    const { user_id } = req.params; // Извлекаем user_id из параметров запроса

    try {
        // Находим все элементы корзины по user_id
        const cartItems = await CartItem.findAll({
            where: { user_id },
        });

        if (cartItems.length === 0) {
            return res.status(404).json({ error: 'Элементы корзины не найдены' });
        }

        // Отправляем ответ с найденными элементами корзины
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Ошибка при получении элементов корзины:', error);
        res.status(500).json({ error: 'Не удалось получить элементы корзины' });
    }
};


