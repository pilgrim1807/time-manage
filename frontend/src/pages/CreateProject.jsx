import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../api/api";

export default function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // проект создаеться через api.js
      await createProject(name, description);

      // после успешного создания пользователь вернеться на страницу проектов
      navigate("/projects");
    } catch (error) {
      console.error("Ошибка создания проекта:", error);
      alert("Не удалось создать проект");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Создание проекта</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Название проекта</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Описание проекта</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            cursor: "pointer",
          }}
        >
          Создать проект
        </button>
      </form>
    </div>
  );
}
