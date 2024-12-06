// controllers/cartController.js
const { Cart } = require('../models'); // Импортируйте вашу модель Cart

// Функция для создания корзины
exports.create = async (req, res) => {
    const { user_id } = req.body; // Извлекаем user_id из тела запроса
    const creation_date = new Date(); // Устанавливаем текущую дату как дату создания

    try {
        // Создаем новую запись в таблице Cart
        const newCart = await Cart.create({
            user_id,
            creation_date,
        });
        
        // Отправляем ответ с созданной корзиной
        res.status(201).json(newCart);
    } catch (error) {
        console.error('Ошибка при создании корзины:', error);
        res.status(500).json({ error: 'Не удалось создать корзину' });
    }
};


exports.getCartByUserId = async (req, res) => {
    const { user_id } = req.params; // Извлекаем user_id из параметров запроса

    try {
        // Находим последнюю корзину по user_id
        const cart = await Cart.findOne({
            where: { user_id },
            order: [['id', 'DESC']], // Сортируем по id в порядке убывания
        });

        if (!cart) {
            return res.status(404).json({ error: 'Корзина не найдена' });
        }

        // Отправляем ответ с найденной корзиной
        res.status(200).json(cart);
    } catch (error) {
        console.error('Ошибка при получении корзины:', error);
        res.status(500).json({ error: 'Не удалось получить корзину' });
    }
};


