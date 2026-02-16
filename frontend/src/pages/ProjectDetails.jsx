import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { api } from "../api/api";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = useSelector(state =>
    state.projects.list.find(p => p.id === id)
  );

  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");

  if (!project) return <div>Не найдено</div>;

  const updateProject = async () => {
    await api.put(`/projects/${id}`, { name, description });
    alert("Проект обновлен");
  };

  return (
    <div>
      <h2>Редактирование проекта</h2>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button onClick={updateProject}>Сохранить</button>
    </div>
  );
}
