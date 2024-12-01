const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // Используйте переменные окружения в реальном проекте!

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  // Удаляем "Bearer " из токена
  const bearerToken = token.split(" ")[1];

  jwt.verify(bearerToken, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Неверный токен" });
    }

    // Сохраняем информацию о пользователе в объекте запроса
    req.user = { id: decoded.id, email: decoded.email };
    next(); // Переходим к следующему middleware или маршруту
  });
};

module.exports = authMiddleware;
