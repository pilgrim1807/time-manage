import { useEffect, useState } from "react";
import { api } from "../api/api";
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

  useEffect(() => {
    api.get("/analytics").then(res => {
      setData(res.data);
    });
  }, []);

  if (!data) return <div>Загрузка...</div>;

  const chartData = {
    labels: ["Проекты"],
    datasets: [
      {
        label: "Количество",
        data: [data.totalProjects]
      }
    ]
  };

  return (
    <div>
      <h2>Аналитика</h2>

      <p>Всего проектов: {data.totalProjects}</p>
      <p>Общее время: {data.totalTime}</p>

      <Bar data={chartData} />
    </div>
  );
}
