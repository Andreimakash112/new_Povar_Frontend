import React from 'react';
import './Header.css';
import { jwtDecode } from 'jwt-decode';




// Внутренний компонент проверки наличия токена





const Ower = ({ setModalBox }) => {
  const storedToken = localStorage.getItem('token');

  if (!storedToken) {
    return (
      <>
      
        <li onClick={() => setModalBox('login')}>Войти</li>
        <li onClick={() => setModalBox('Registration')}>Регистрация</li>
      </>
    );
  }

function removeToken() {
        const token = localStorage.getItem('token');
        if (token === null) {
             console.log('Вы покидаете кабинет');
            
        } else {
            localStorage.removeItem('token');
            window.location.reload();  
        }
    } 
  // Если токен есть, выводим пункт меню выхода
  return ( <>
    <li onClick={removeToken}>Выйти</li>

  <p> {jwtDecode(storedToken)?.login }</p>
  </>
  );
};
//////////////////

// Компонент администраторской панели
const BankingReq = ({ changePageAdmin }) => {
  const storedToken = localStorage.getItem('token');

  if (storedToken && jwtDecode(storedToken)?.login === "админ")
    {
    return <li onClick={changePageAdmin}>Admin</li>;
  }

  return null;
};

// Основной компонент заголовка
function Header({ setPage, setModalBox, setToken }) {

  function changePage() {
    setPage('Main');
  }

  function changePageAdmin() {
    setPage('Info');
  }

  function changePageBas() {
    setPage('Bas');
  }

  

  return (
    <div className="Header">
      <section className="NavUser">
        <ul>
          <Ower setModalBox={setModalBox} setToken={setToken} />
        </ul>
      </section>
      <br/>
      <h1>Столовая "Поварёшка"</h1>
      <p>Организация питания для сотрудников и мероприятий</p>
      <p>Мы предлагаем комплексные обеды от 10 человек с понедельника по пятницу.</p>
      <br/>
      <section className="Navigation">
        <ul>
          <li onClick={changePage}>ГЛАВНАЯ</li>
          <BankingReq changePageAdmin={changePageAdmin} /> {/* Передача функции */}
          <li onClick={changePageBas}>К ЗАКАЗАМ</li>
        

        </ul>
      </section>
    </div>
  );
}

export default Header;
