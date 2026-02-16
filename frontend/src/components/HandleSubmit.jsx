import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/api"; // импорт функций для авторизации и регистрации

const HandleSubmit = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // очистка сообщений перед отправкой формы

    // валидация email и пароля
    if (!email || !password) {
      setMessage("Пожалуйста, заполните все поля.");
      return;
    }

    try {
      let res;
      if (isLogin) {
        res = await loginUser(email, password); //  импортированная функция loginUser
      } else {
        res = await registerUser(email, password); // импортированная функция registerUser
        setMessage("Регистрация прошла успешно! Теперь войдите.");
        setIsLogin(true);
      }

      if (res?.token) {
        localStorage.setItem("authToken", res.token);
        navigate("/"); // переход на главную страницу
      }
    } catch (error) {
      setMessage("Что-то пошло не так. Попробуйте позже.");
      console.error(error); // лог ошибок для отладки
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">{isLogin ? "Войти" : "Зарегистрироваться"}</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default HandleSubmit;
