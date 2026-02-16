import React, { useState } from "react";
import "./Login.css";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // Переключатель для логина и регистрации

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
        <form>
          <div className="input-group">
            <label>Электронная почта</label>
            <input type="email" placeholder="Введите вашу почту" />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input type="password" placeholder="Введите ваш пароль" />
          </div>
          <button type="submit">{isLogin ? "Войти" : "Зарегистрироваться"}</button>
        </form>
        <div className="toggle-link">
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Нет аккаунта? Зарегистрируйтесь!"
              : "Уже есть аккаунт? Войти"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;