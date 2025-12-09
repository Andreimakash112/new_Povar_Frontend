import React, { useState } from 'react';

function Registration({ message }) {
    const [regMessage, setRegMessage] = useState('');

    function Reg() {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const userstatus = '1';
        const data = {
            login,
            password,
            email,
            userstatus
        };

        const api = 'http://127.0.0.1:9001/registration';

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(result => result.json())
        .then((result) => {
            setRegMessage(result.message || result.error); // Установим новое сообщение
        })
        .catch(error => {
            setRegMessage('Ошибка при регистрации.');
        });
    }

    return (
        <>
            <h1>Регистрация</h1>
            <input id='login' type='text' placeholder='НАЗВАНИЕ ОРГАНИЗАЦИИ' />
            <input id='password' type='password' placeholder='ПРИДУМАЙТЕ ПАРОЛЬ' />
            <input id='email' type='email' placeholder='Почта' />
            <button onClick={Reg}>Сохранить</button>
            <p style={{ color: regMessage.includes('успешно') ? 'green' : 'red' }}>
                {regMessage}
            </p>
        </>
    );
}

export default Registration;
