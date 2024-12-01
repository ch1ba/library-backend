const jwt = require("jsonwebtoken");
const SECRET_KEY = "pip"; 

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  const tokenParts = authHeader.split(" ");
  
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Неверный формат токена" });
  }

  const token = tokenParts[1];

  // Проверяем токен и декодируем его
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Неверный или истекший токен" });
    }

    req.user = { id: decoded.id, email: decoded.email };
    next();
  });
};

module.exports = authMiddleware;