import React, { useState, useEffect } from "react";
import api from "../api/api";  // Импорт api как default
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function Analytics() {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState(''); // состояние для фильтра

  useEffect(() => {
    api.get("/analytics")
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.error("Ошибка при получении данных аналитики:", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value); // обработчик фильтрации
  };

  if (!data) return <div>Загрузка...</div>;

  const filteredData = filter
    ? data.totalTime.filter(item => item.time > filter) // фильтрация
    : data.totalTime;

  const chartData = {
    labels: ["Проекты"],
    datasets: [
      {
        label: "Количество",
        data: [filteredData.length]
      }
    ]
  };

  return (
    <div>
      <h2>Аналитика</h2>

      <input
        type="number"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Фильтр по времени"
      />

      {/* chartData для отображения графика */}
      <Bar data={chartData} />
    </div>
  );
}
