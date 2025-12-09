import React from 'react';
import './Header.css';


function Header({setPage}) {

 function changePage(){
    setPage('Main')
  }
  function changePageAdmin(){
    setPage('Info')
  }

  return (
    <div className="Header">
      
  <h1>Столовая "Поварёшка"</h1>
  <br/>
        <p>Организация питания для сотрудников и мероприятий</p>
        <p>Мы предлагаем комплексные обеды от 10 человек с понедельника по пятницу.</p>
<br/>
        <section className="Navigation">
<ul>
  <li  onClick={changePage}>ГЛАВНАЯ</li>
  <li  onClick={changePageAdmin}>Админ</li>
  <li>КОНТАКТЫ</li>
</ul>


        </section>
    </div>
  );
}

export default Header;