import React from 'react';
import './Footer.css';
import im_2 from './Images/houm.jpg';
import im_3 from './Images/qr-kod.jpg';
import Data from './Admin/Data';

function Footer() {
  return (
    <footer className="Footer">
      <h1 className="Footer-titl">КОНТАКТЫ</h1>
      <section className="sectio">
        <article className="Foot">
          
<Data  />
           

            <br/>
               <p>Исключительно по договору 🤝</p>
        <p>Оплата по безналу в конце месяца после выставления счета.</p>
          
        </article>

        <article className="Foot">
          <div className="smoll">
            <img src={im_2} alt="Foto" />
          </div>
        </article>

        <article className="Foot">
          <div className="smoll">
            <img className="ard__img" src={im_3} alt="qr_kod" />
          </div>
        </article>
      </section>

      <div className="Footer-note">
        <p>Исключительно по договору 🤝</p>
        <p>Оплата по безналу в конце месяца после выставления счета.</p>
      </div>
    </footer>
  );
}

export default Footer;

