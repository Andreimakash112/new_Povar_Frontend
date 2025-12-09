import React, { useState, useEffect } from 'react';
import './AdminData.css';
import Data from './Data';
import Admin from './Admin';

const AdminData = () => {
  const ORG_ID = '1'; // Постоянный orgId

  const [data, setData] = useState({
    name: '',
    address: '',
    location: '',
    phone: '',
    email: '',
    orgId: ORG_ID
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Получаем данные с сервера при первой загрузке страницы
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9001/api/data/${ORG_ID}`); // URL заключен в кавычки
        const fetchedData = await response.json();
        setData(fetchedData); // Обновляем состояние данными с сервера
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData(); // Вызываем функцию получения данных
  }, []); // Никаких зависимостей, так как ORG_ID — постоянная величина

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:9001/api/data/${ORG_ID}`, { // URL заключен в кавычки
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setMessage(result.message);

    // Немедленно обновляем данные после сохранения
    const fetchUpdatedData = async () => {
      try {
        const response = await fetch(`http://localhost:9001/api/data/${ORG_ID}`); // URL заключен в кавычки
        const updatedData = await response.json();
        setData(updatedData); // Обновляем состояние свежими данными
      } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
      }
    };

    fetchUpdatedData(); // Обновляем данные после отправки формы
  };

  return (
    <div className="admin-data">
      <h2>АДРЕС ОРГАНИЗАЦИИ</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={data.name} onChange={handleChange} placeholder="Name" required />
        <input name="address" value={data.address} onChange={handleChange} placeholder="Address" required />
        <input name="location" value={data.location} onChange={handleChange} placeholder="Location" required />
        <input name="phone" value={data.phone} onChange={handleChange} placeholder="Phone" required />
        <input name="email" value={data.email} onChange={handleChange} placeholder="Email" required />
        <button type="submit">Ввести или изменить данные</button>
      </form>
      {message && <p>{message}</p>}
       <Data/>
       <Admin/>
    </div>
   
  );
};

export default AdminData;