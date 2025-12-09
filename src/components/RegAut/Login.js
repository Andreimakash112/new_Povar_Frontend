import React, { useState } from 'react';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');

  function Log() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const data = {
      login: login,
      password: password
    };

    console.log(data); 
    const api = 'http://127.0.0.1:9001/login';

    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(result => result.json())
      .then(result => {
        if (result.token) { 
          window.location.reload(); // перезагрузка страницы заблокирована
          localStorage.setItem('token', result.token); 
        } else {
          localStorage.removeItem('token');
          setErrorMessage('Пользователь не найден');
        }
      })
      .catch(() => {
        console.log('Пользователь не найден');
        setErrorMessage('Пользователь не найден');
      });
  }
  
  return ( 
    <>
      <h1>Авторизация</h1>
      <input id='login' type='text' placeholder='НАЗВАНИЕ ОРГАНИЗАЦИИ' />
      <input id='password' type='password' placeholder='ВВЕДИТЕ ПАРОЛЬ' />
      <button onClick={Log}>войти</button>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default Login;
