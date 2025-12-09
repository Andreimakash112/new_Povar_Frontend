
import React from 'react';
import './Info.css';

import im_2 from '../components/Images/12.jpg'; 
import name from '../components/Images/name.jpg'; 
import video from '../components/Images/large.mp4'; 
 import Menu from '../components/Menu';
import poster from '../components/Images/02.jpg'; 


function Info() {
  return (
    <div className="Info">
 
 
 
 
 
       <section className="services">
         <h2>СТРАНИЦА АДМИНИСТРАТОРА САЙТА</h2>
         <br/>
        
       </section>
 <br/>
       <h2>Меню на неделю</h2>
         <br/>
       <p>Стоимость обеда: 400₽ (цена может варьироваться) (включает суп, горячее, салат и хлеб).</p>
       
         <br/>
 
<Menu/>
 
 
       <section className="video-section">
         <h2>Видео о нашей столовой</h2>
         <div className="video-wrapper">
           <video
             src={video}
             controls
             width="100%"
             preload="metadata"
             poster={poster}
             aria-label="Видео-тур по столовой Поварёшка"   >
           </video>
         </div>
         <p className="video-caption">Краткий видео-тур по нашей кухне и упаковке заказов</p>
       </section>





<h2>Преимущества:</h2>
 <br/>
<section className="corporate">
 
    
        <div className="card-container">
          <div className="inf">
            <h4>Делаем с душой</h4>
            <p>Мы готовим вкусное и полезное питание. Поэтому тщательно отбираем поставщиков. Используем только качественные свежие продукты.</p>
          </div>
          <div className="inf">
            <img src={im_2} alt="Описание фото" className="responsive-image" />
          </div>
          <div className="inf">
            <h4>Каждую неделю новое меню</h4>
            <p>Наши рационы подходят всем. Каждый найдет что нравится именно ему. При этом не тратя время на готовку.</p>
          </div>
        </div>

</section>

<h2>Результаты опросов:</h2>
 <br/>
<section className="corporate">
 
    
        <div className="card-container">
          <div className="inf">
            <h2>62 %</h2>
            <br/>
            <p>Сотрудники ожидают от работадателя корпоративное питание от работодателя .</p>
          </div>
         
          <div className="inf">
            <h2 >35%</h2>
            <br/>
            <p>Работодателей уже организовали корпоративное питание для своих сотрудников</p>
          </div>
           <div className="inf">
            <img src={name} alt="фото повара" className="responsive-image" />
          </div>
        </div>

</section>






<h2>
  Удобная упаковка <br/>
Разнообразное меню<br/>
Соблюдение стандартов качества<br/>
Сбалансированное питание для всех работников<br/>
Экономия времени
</h2>

<section className="features">
  <div className="featuress">
    <article className="feature">
      <h4>Безопасность</h4>
      <p>Тщательно отбираем поставщиков. Используем только качественные свежие продукты.Строго соблюдаем  нормы Роспотребнадзора.</p>
    </article>

    <article className="feature">
      <h4>Удобная оплата</h4>
      <p>Работаем с юридическими лицами, ип ,частными лицами.Оплата в конце месяца наличным и безналичным способом.</p>
    </article>

    <article className="feature">
      <h4>Доставка и упаковка</h4>
      <p>Свежие блюда доставляются в экологичной упаковке и сохраняют вкус и полезные свойства.</p>
    </article>
      <article className="feature">
      <h4>Натуральные продукты</h4>
      <p>Мы готовим вкусное и полезное питание. Используем только качественные свежие продукты.Без усилителей вкуса и эмульгаторов.</p>
    </article>

    <article className="feature">
      <h4>Разнообразное  меню</h4>
      <p>Наши рационы подходят всем. Каждый найдёт то, что нравится именно ему.Имеются как высококалорийные так и диетические блюда.</p>
    </article>


<article className="feature">
      <h4>Своевременная доставка и ответственный подход.</h4>
      <p>Мы работаем давно в этой сфере.Много благодарных клиентов.</p>
    </article>
  </div>
</section>







    </div>
  );
}


export default Info; 