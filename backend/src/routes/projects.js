import express from 'express';
import auth from '../middleware/auth.js'; // Импорт middleware для проверки токена

const router = express.Router();

// Пример защищенного маршрута для получения проектов
router.get("/", auth, (req, res) => {
  try {
    const projects = [
      { id: 1, name: "Проект 1" },
      { id: 2, name: "Проект 2" },
    ];

    res.json(projects); 
  } catch (error) {
    console.error("Ошибка при получении проектов:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;
