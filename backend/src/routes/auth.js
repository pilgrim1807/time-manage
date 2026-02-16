import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Загружаем переменные окружения

const auth = (req, res, next) => {
  // Получаем токен из заголовка Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Нет токена" });
  }

  try {
    // Проверяем токен с использованием секретного ключа
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Сохраняем информацию о пользователе в запросе
    next(); // Продолжаем выполнение
  } catch (error) {
    return res.status(401).json({ message: "Невалидный токен" });
  }
};

export default auth;
