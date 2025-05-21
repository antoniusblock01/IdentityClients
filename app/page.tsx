'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './loginPage.css';

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login === 'admin' && password === 'admin') {
      setError('');
      router.push('/menu');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Вход в систему</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {error && <p className="login-error">{error}</p>}
          <div className="login-button-container">
            <button type="submit" className="login-button">Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
}
