import React, { useState, useEffect } from "react";
import api from "../api/api";  // Импорт api как default

function ProjectDetails() {
  const [project, setProject] = useState(null);  // стейт для хранения данных о проекте
  const [error, setError] = useState("");  // стейт для хранения ошибок

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get("/projects/1");  // данные по проекту
        setProject(response.data);
      } catch (error) {
        setError("Ошибка при загрузке данных");
        console.error(error);
      }
    };

    fetchProject();
  }, []);

  if (error) return <div>{error}</div>;  //если ошибки есть она выведиться

  return (
    <div>
      {project ? (
        <div>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default ProjectDetails;
