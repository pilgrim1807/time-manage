import React, { useEffect } from "react";
import { fetchProjects } from "../features/projectSlice"; // запрос на API для получения проектов
import Pagination from "../components/Pagination"; // компонент пагинации
import { useDispatch, useSelector } from "react-redux";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, isLoading, error, currentPage, totalPages } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects(currentPage)); // загрузка проектов для текущей страницы
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(fetchProjects(page)); // обновление страницы
  };

  if (isLoading) return <p>Загрузка...</p>;

  if (error) return <p>Ошибка: {error}</p>;

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

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default Projects;
