import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

// настройки пользователя
router.put("/settings", auth, (req, res) => {
  // обновление данных пользователя в базе данных
  res.json({ message: "Настройки обновлены" });
});

export default router;
