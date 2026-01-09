import React, { useState } from 'react';

// Регулярное выражение для проверки формата e-mail
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}(?:\.[^\s@.]{2,})*$/;

function Registration({ message }) {
    const [values, setValues] = useState({
        login: '',
        password: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        loginError: '',
        passwordError: '',
        emailError: ''
    });

    const [regMessage, setRegMessage] = useState('');

    // Обработка изменения логина
    function handleLoginChange(value) {
        setValues(prevState => ({...prevState, login: value}));
    }

    // Обработка изменения пароля
    function handlePasswordChange(value) {
        setValues(prevState => ({...prevState, password: value}));
    }

    // Обработка изменения e-mail
    function handleEmailChange(value) {
        let errorText = '';
        if (!EMAIL_REGEX.test(value)) {
            errorText = 'Некорректный формат E-Mail.';
        }
        setErrors(prevState => ({
            ...prevState,
            emailError: errorText
        }));
        setValues(prevState => ({...prevState, email: value}));
    }

    // Основная логика регистрации
    function Reg() {
        const { login, password, email } = values;

        // Проверяем наличие ошибок перед отправкой данных
        if (!login || !password || !email || errors.emailError !== '') {
            setRegMessage('Заполните все поля правильно!');
            return;
        }

        const userstatus = '1'; // По умолчанию статус пользователя

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
        .then(response => response.json())
        .then((result) => {
            setRegMessage(result.message || result.error);
        })
        .catch(() => {
            setRegMessage('Ошибка при регистрации.');
        });
    }

    return (
        <>
            <h1>Регистрация</h1>
            <input
                id='login'
                type='text'
                placeholder='Название организации'
                value={values.login}
                onChange={(e) => handleLoginChange(e.currentTarget.value)}
            />
            <span style={{color: 'red'}}>{errors.loginError}</span><br/>
            
            <input
                id='password'
                type='password'
                placeholder='Придумайте пароль'
                value={values.password}
                onChange={(e) => handlePasswordChange(e.currentTarget.value)}
            />
            <span style={{color: 'red'}}>{errors.passwordError}</span><br/>
            
            <input
                id='email'
                type='email'
                placeholder='Почта'
                value={values.email}
                onChange={(e) => handleEmailChange(e.currentTarget.value)}
            />
            <span style={{color: 'red'}}>{errors.emailError}</span><br/>
            
            <button onClick={Reg}>Сохранить</button>
            <p style={{ color: regMessage.includes('успешно') ? 'green' : 'red' }}>
                {regMessage}
            </p>
        </>
    );
}

export default Registration;
