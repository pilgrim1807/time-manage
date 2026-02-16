import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api/api";  // Импорт loginUser и registerUser
import "./Login.css";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Сбросить сообщение

    try {
      let res;

      if (isLogin) {
        res = await loginUser(email, password); // Вход
      } else {
        res = await registerUser(email, password); // Регистрация
        setMessage("Регистрация прошла успешно! Теперь войдите.");
        setIsLogin(true); // Переключение на форму входа после успешной регистрации
      }

      if (res?.token) {
        localStorage.setItem("authToken", res.token); // Сохранение токена в localStorage
        navigate("/"); // Перенаправление на главную страницу после входа
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setMessage("Неверный email или пароль.");
      } else if (error.response?.status === 409) {
        setMessage("Пользователь уже зарегистрирован.");
      } else {
        setMessage("Ошибка сервера.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isLogin ? "Вход" : "Регистрация"}</h2>

        {message && <div className="error-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <div className="toggle-link">
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Нет аккаунта? Зарегистрируйтесь"
              : "Уже есть аккаунт? Войти"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
