import React from "react";
import { useDispatch } from "react-redux";
import { removeProject } from "../features/projectSlice"; // Импорт экшенf для удаления проекта

const DeleteProject = ({ projectId }) => {
  const dispatch = useDispatch(); //  useDispatch внутри компонента

  const deleteProject = async () => {
    const response = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("authToken"),
      },
    });

    if (response.ok) {
      dispatch(removeProject(projectId)); // удаление проекта из redux
    } else {
      console.error("Ошибка при удалении проекта");
    }
  };

  return (
    <div>
      <button onClick={deleteProject}>Удалить проект</button>
    </div>
  );
};

export default DeleteProject;
