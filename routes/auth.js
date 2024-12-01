const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require('../models');
const authMiddleware = require("../middleware/authMiddle"); // Импортируем middleware

const router = express.Router();
const SECRET_KEY = "your_secret_key"; // Используйте переменные окружения в реальном проекте!

// Регистрация пользователя
router.post("/register", async (req, res) => {
    console.log("Запрос на регистрацию:", req.body); // Логируем тело запроса

    const { name, email, phone, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email и пароль обязательны" });
    }

    try {
        console.log("Проверка существующего пользователя...");
        const existingUser = await User.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email уже используется" });
        }

        console.log("Хэширование пароля...");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Создание нового пользователя...");
        const newUser = new User({ name, email, phone, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        res.status(500).json({ message: "Ошибка сервера", error: error.message });
    }
});

// Вход пользователя
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Проверка, существует ли пользователь
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Неверный пароль" });
    }

    // Генерация JWT
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h", // Токен действует 1 час
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Получение информации о пользователе (защищенный маршрут)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // Используем информацию о пользователе из middleware
    const userId = req.user.id;
    
    // Находим пользователя по ID
    const user = await User.findById(userId).select("-password"); // Исключаем пароль из ответа

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
