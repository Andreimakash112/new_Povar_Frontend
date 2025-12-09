
import React, { useEffect, useState } from 'react';
import './Card.css';
import Product from './Product';

function Card() {
  const [cards, setCards] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch('http://localhost:9001/api/cards');
      if (response.ok) {
        const data = await response.json();
        setCards(data);
      } else {
        const errorData = await response.json();
        console.error('Ошибка при загрузке карточек:', errorData);
        alert('Ошибка при загрузке карточек: ' + (errorData.message || 'Неизвестная ошибка'));
      }
    } catch (error) {
      alert('Ошибка сети при загрузке карточек');
    }
  };

  const addCard = async () => {
    if (newTitle.trim() === '' || newImage.trim() === '') {
      return alert('Введите заголовок и URL изображения');
    }

    try {
      const response = await fetch('http://localhost:9001/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, image: newImage }),
      });

      const data = await response.json();

      if (response.ok) {
        setCards([...cards, data]);
        setNewTitle('');
        setNewImage('');
      } else {
        alert('Ошибка при добавлении карточки: ' + (data.message || 'Неизвестная ошибка'));
      }
    } catch (error) {
      alert('Ошибка сети при добавлении карточки');
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Заголовок"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL изображения"
          value={newImage}
          onChange={e => setNewImage(e.target.value)}
        />
        <button onClick={addCard}>Добавить карточку</button>
      </div>

      <article className="cardName">
        {cards.map(card => (
          <div className="card" key={card._id}>
            <div className="card__item">
              <div className="card__header">
                <h2>{card.title}</h2>
                <img className="card__img" src={card.image} alt={card.title} />
              </div>
              <div className="card__body">
                <Product />
              </div>
            </div>
          </div>
        ))}
      </article>
    </div>
  );
}

export default Card;

