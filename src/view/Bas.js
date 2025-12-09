import React from 'react';
import './Info.css';

import MenuBas from '../components/MenuBas';
import Order from '../components/Basket/Order'; 
import Manager from '../components/Basket/Manager'; 

function Bas({token, settoken}) {
  return (
    <div className="Info">
      <section className="services">
        <h2>Наши услуги</h2>
        <br/>
        <ul>
          <li>Питание для сотрудников</li>
          <li>Выездные банкеты и кейтеринг фуршеты</li>
        </ul>
        <br/>
        <h3>Корпоративное питание для предприятий 🍽</h3>
        <p>Доставка осуществляется от 5 обедов.</p>
      </section>
      <br/>
      <h2>Меню на неделю</h2>
      <br/>
      <p>Стоимость обеда: 400₽ (цена может варьироваться) (включает суп, горячее, салат и хлеб).</p>
      <br/>
      <MenuBas />
      <section>
       <Manager /> 
      </section>
      <section>
        <Order token ={token} settoken ={settoken}/>
      </section>
    </div>
  );
}
export default Bas;
