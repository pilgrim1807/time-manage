import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, startTimer, stopTimer } from "../features/projectSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { items = [], activeEntry } = useSelector((s) => s.projects || {});
  const [selected, setSelected] = useState("");

  useEffect(() => {
    dispatch(
      fetchProjects({
        page: 1,
        limit: 50,
        sort: "createdAt",
        order: "desc",
      })
    );
  }, [dispatch]);

  return (
    <div className="card">
      <h2>Главная</h2>

      <div className="row">
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          <option value="">Выбрать проект</option>
          {items.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>

        {!activeEntry ? (
          <button
            disabled={!selected}
            onClick={() => dispatch(startTimer(selected))}
          >
            Старт
          </button>
        ) : (
          <button onClick={() => dispatch(stopTimer())}>Стоп</button>
        )}
      </div>

      <div className="hint">
        Проекты: <Link to="/projects">перейти</Link>
      </div>
    </div>
  );
}
