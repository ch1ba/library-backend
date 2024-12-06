const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./models');


// Инициализация приложения
dotenv.config();
const app = express();
app.use(bodyParser.json()); // для обработки JSON в запросах

var cors = require('cors');
var corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // указываем, откуда будут приходить запросы
    credentials: true, // разрешаем обрабатывать запросы
    optionSuccessStatus: 200 // при успешной обработке запроса будет возвращён статус 200
};
app.use(cors(corsOptions));



// Подключаем роуты
var book = require('./routes/book.route');
book(app);

var genres = require('./routes/genre.route');
genres(app);

var carts = require('./routes/cart.route');
carts(app);

var cartsItems = require('./routes/cartItem.route')
cartsItems(app);

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);




// Подключение к базе данных и запуск сервера
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) // force: false — не перезаписывать таблицы
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });