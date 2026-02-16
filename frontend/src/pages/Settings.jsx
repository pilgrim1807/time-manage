import { useState } from "react";
import { api } from "../api/api";

export default function Settings() {
  const [name, setName] = useState("");

  const save = async () => {
    await api.put("/user/settings", { name });
    alert("Сохранено");
  };

  return (
    <div>
      <h2>Настройки</h2>

      <input
        placeholder="Новое имя"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button onClick={save}>Сохранить</button>
    </div>
  );
}
