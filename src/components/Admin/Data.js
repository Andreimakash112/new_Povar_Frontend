import React, { useEffect, useState } from 'react';
import './Data.css';

function FooterData() {
  const [adminData, setAdminData] = useState(null); // Начальное состояние null

  // Функция для получения данных с сервера
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9001/api/data/1');
      const fetchedData = await response.json();
      setAdminData(fetchedData); // Присваиваем полученные данные состоянию
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  useEffect(() => {
    // Первый раз запрашиваем данные при монтировании компонента
    fetchData();

    // Настраиваем интервал для регулярного обновления данных
    const interval = setInterval(fetchData, 5000); // Обновляем каждые 5 секунд

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
     
        <div className="footer-content">
          <h3 className="ard__name">{adminData?.name ?? 'Загрузка...'}</h3>
          <p className="ard__text">{adminData?.location ?? ''}</p>
          <div className="divider" />
          <p className="ard__text">{adminData?.address ?? ''}</p>
          {adminData?.additionalAddress && <p className="ard__text">{adminData.additionalAddress}</p>}
          <p className="ard__phone">📞 {adminData?.phone ?? ''}</p>
          <p className="ard__email">{adminData?.email ?? ''}</p>
        </div>
     
    </footer>
  );
}

export default FooterData;


