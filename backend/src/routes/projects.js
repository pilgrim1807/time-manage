import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

let projects = []; // Проекты в памяти

// Получить все проекты
router.get("/", auth, (req, res) => {
  res.json(projects.filter(p => p.userId === req.user.id)); // Фильтруем по пользователю
});

// Создать новый проект
router.post("/", auth, (req, res) => {
  const { name, description } = req.body;

  const newProject = {
    id: Date.now().toString(),
    userId: req.user.id,
    name,
    description,
    createdAt: new Date(),
    totalTime: 0
  };

  projects.push(newProject);
  res.json(newProject);
});

// Обновить проект
router.put("/:id", auth, (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) return res.status(404).json({ message: "Проект не найден" });

  project.name = req.body.name ?? project.name;
  project.description = req.body.description ?? project.description;

  res.json(project);
});

// Удалить проект
router.delete("/:id", auth, (req, res) => {
  projects = projects.filter(p => p.id !== req.params.id);
  res.json({ message: "Проект удалён" });
});

export default router;
