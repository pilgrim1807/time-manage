import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import analyticsRoutes from './routes/analytics.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use(express.json()); // для обработки JSON 

// маршруты
app.use("/api/auth", authRoutes); // Логин
app.use("/api/projects", projectRoutes); // Проекты
app.use("/api/analytics", analyticsRoutes); // Аналитика
app.use("/api/user", userRoutes); // Настройки

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
