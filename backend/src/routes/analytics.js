import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

// Данные для аналитики
router.get("/", auth, (req, res) => {

  res.json({
    totalProjects: 5, // В реальности должно быть из базы данных
    totalTime: 1200 // Время работы по проектам в секундах
  });
});

export default router;
