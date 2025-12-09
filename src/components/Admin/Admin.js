import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Компонент профиля пользователя
function Profile() {
  const [userData, setUserData] = useState(null); // Начальное состояние пользователей
  const [newPassword, setNewPassword] = useState(''); // Новый пароль

  // Читаем данные из токена при монтировании компонента
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        // Декодируем JWT-токен
        const decoded = jwtDecode(storedToken);
        console.log('Декодированный токен:', decoded); // Выведем в консоль содержание токена

        // Устанавливаем декодированные данные в state
        setUserData(decoded);
      } catch (err) {
        console.error('Ошибка декодирования токена:', err);
      }
    }
  }, []); // Без зависимостей, чтобы сработало единожды при монтировании компонента

  // Функция для изменения пароля
  const NewPassword = async () => {
    const pass = document.getElementById('pass').value;

    if (pass.length === 0) {
      document.getElementById('passMessage').innerText = "Введите новый пароль!";
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Вы не авторизованы");
      return;
    }

    const data = {
      token: token,
      password: pass
    };

    console.log(data);

    const api = 'http://127.0.0.1:9001/user/NewPassword';

    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        document.getElementById('passMessage').innerText = result.message;
      })
      .catch((error) => {
        console.error('Ошибка при изменении пароля:', error);
        document.getElementById('passMessage').innerText = "Ошибка соединения с сервером";
      });
  };

  // Функция выхода из аккаунта (удаление токена)
  const removeToken = () => {
    const token = localStorage.getItem('token');
    if (token === null) {
      alert('Вы покидаете кабинет');
    } else {
      localStorage.removeItem('token');
      window.location.reload();
    }
  };

  // Отображаем данные только если они были получены
  if (!userData) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <hr />
      <h2>Данные админа</h2>
      
      
      <p>Имя пользователя: {userData.login}</p>
      <p>Электронная почта: {userData.email}</p>
      

      <hr />

      <h3>Изменить пароль</h3>
      <form onSubmit={(event) => event.preventDefault()} style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="pass">Новый пароль:</label>
        <input
          type="password"
          id="pass"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Введите новый пароль"
        />
        <br/>
        <span id="passMessage"></span>
        <br/>
        <button onClick={NewPassword}>Обновить пароль</button>
      </form>
<br/>
      <button onClick={removeToken}>Выйти из кабинета</button>
    </div>
  );
}

export default Profile;
