import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Загрузка переменных окружения

const router = express.Router();

// Пример базы данны
const users = [
  {
    id: 1,
    email: 'test@example.com',
    password: 'password123',
  },
];

// Маршрут для регистрации
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Проверка, существует ли пользователь
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'Пользователь уже существует' });
  }

  // Добавляем нового пользователя
  const newUser = { id: users.length + 1, email, password };
  users.push(newUser);

  // Генерация JWT токен
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});


export default router;
