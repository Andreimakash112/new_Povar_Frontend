import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Основной компонент Order
export default function Order() {
  // Локальные состояния для хранения массива заказов и имени пользователя
  const [ordersList, setOrdersList] = useState([]);
  const [loginUsername, setLoginUsername] = useState('');

  // Загрузка данных из localStorage
  const loadFromLocalStorage = () => {
    // Получаем сырые заказы из localStorage
    const rawOrders = localStorage.getItem('orders');
    let storedOrders = [];

    try {
      // Парсим JSON-данные заказов
      storedOrders = rawOrders ? JSON.parse(rawOrders) : [];
    } catch (e) {
      console.error('Ошибка парсинга orders:', e);
    }

    // Сохраняем все заказы в состояние
    setOrdersList(storedOrders);

    // Извлекаем token из localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        // Декодируем JWT-токен
        const decoded = jwtDecode(storedToken);
        // Выбираем подходящий ключ для username
        const login = decoded?.login ?? decoded?.sub ?? decoded?.username ?? '';
        setLoginUsername(login);
      } catch (err) {
        console.error('Ошибка декодирования токена:', err);
      }
    }
  };

  // Хук жизненного цикла для начальной загрузки данных
  useEffect(() => {
    loadFromLocalStorage();
  }, []); // пустой массив зависимостей гарантирует однократный запуск хука

  // Функция для скачивания единого файла с актуальными данными
  const handleDownloadAllOrders = () => {
    // Формирование общего содержания файла
    let allFileContent = '';

    ordersList.forEach((order) => {
      // Информация о заказе
      allFileContent += `# Номер заказа: ${order.number}\n`;
      allFileContent += `Перечень блюд:\n`;

      // Список позиций в заказе
      const items = Array.isArray(order.items) ? order.items : [];
      items.forEach((item) => {
        allFileContent += `${item.title ?? 'Без названия'} ( ${
          item.quantity ?? 0
        }) x ${item.price ?? 0} ₽\n`;
      });

      
      allFileContent += '\n\n';
    });

    // Добавляем имя пользователя, если оно доступно
    if (loginUsername) {
      allFileContent += `Создано пользователем: ${loginUsername}`;
    }

    // Создаем объект Blob и ссылку для скачивания
    const blob = new Blob([allFileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'все_заказы.txt'; // Название файла
    document.body.appendChild(link);
    link.click(); // инициируем клик по ссылке
    document.body.removeChild(link); // удаляем временную ссылку
    URL.revokeObjectURL(link.href); // освобождаем память
    alert('Файл успешно сформирован и доступен для скачивания.');
  };

  // Функция для ручной переинициализации данных
  const refreshData = () => {
    loadFromLocalStorage();
  };




 //
  // Возвращаем JSX-разметку компонента
  return (
    <div className="order-container">
      <h1>ВАШИ ЗАКАЗЫ</h1>
      <p>Пользователь: {loginUsername || 'не определён'}</p>
      <br/>
      <button onClick={refreshData}>
        СОБРАТЬ ВСЕ ЗАКАЗЫ В ОДИН ЗАКАЗ
      </button>
     
      <button onClick={handleDownloadAllOrders}>
        Скачать файл со всеми заказами
      </button>
      
<p>Отправте скачаный заказ  нам на почту </p>
    
    </div>
  );
}
