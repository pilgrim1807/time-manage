import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../features/projectSlice"; // Импорт логики для загрузки проектов

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, isLoading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects()); // загрузка проектов
  }, [dispatch]);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div>
      <h1>Проекты</h1>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      ) : (
        <p>Нет доступных проектов</p>
      )}
    </div>
  );
};

export default Projects;
