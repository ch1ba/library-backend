const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require('../models');
const authMiddleware = require("../middleware/authMiddle"); 

const router = express.Router();
const SECRET_KEY = "pip"; 

// Регистрация пользователя
router.post("/register", async (req, res) => {
    console.log("Запрос на регистрацию:", req.body); 

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
    const user = await User.findOne({ where: { email: email} });
    console.log(user.name);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Неверный пароль" });
    }

    const token = jwt.sign({ email: user.email, id: user.id}, SECRET_KEY, {
      expiresIn: "1h", 
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Получение информации о пользователе
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json({
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
