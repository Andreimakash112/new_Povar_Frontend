import React, { useEffect, useState } from 'react';
import './Card.css';
import Product from './Product';

function Card() {
  const [cards, setCards] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const response = await fetch('http://localhost:9001/api/cards');
    const data = await response.json();
    setCards(data);
  };

  const addCard = async () => {
    if (newTitle.trim() === '' || !newImageFile) {
      return alert('Введите заголовок и выберите изображение');
    }

    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('image', newImageFile);

    const response = await fetch('http://localhost:9001/api/cards', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const createdCard = await response.json();
      setCards([...cards, createdCard]);
      setNewTitle('');
      setNewImageFile(null);
      document.getElementById('imageInput').value = null;
    } else {
      alert('Ошибка при добавлении карточки');
    }
  };

  const deleteCard = async (id, imagePath) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту карточку?')) return;

    const response = await fetch(`http://localhost:9001/api/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imagePath }),
    });

    if (response.ok) {
      setCards(cards.filter((card) => card._id !== id));
    } else {
      alert('Ошибка при удалении карточки');
    }
  };

  return (
    <div className="Menu">
      <div>
        <input
          id="title-input"
          type="text"
          placeholder="Введите заголовок"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <label htmlFor="imageInput" className="custom-file-button">
          Выбрать фотографию
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={(e) => setNewImageFile(e.target.files[0])}
            style={{ display: 'none' }}
          />
        </label>

        <button onClick={addCard}>Добавить карточку</button>
      </div>

      <div className="container">
        {cards.map((card) => (
          <div className="cardName" key={card._id}>
            <div className="card__item">
              <div
                className="card__header"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <h2>{card.title}</h2>
                <button
                  aria-label={`Удалить карточку "${card.title}"`}
                  onClick={() => deleteCard(card._id, card.image)}
                >
                  Удалить
                </button>
              </div>
              {card.image ? (
                <img
                  className="card__img"
                  src={`http://localhost:9001${card.image}`}
                  alt={`${card.title}: изображение продукта`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/path/to/default-image.jpg';
                  }}
                />
              ) : (
                <p>Изображение не доступно</p>
              )}
              <div className="card__body">
                <Product cardId={card._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;

