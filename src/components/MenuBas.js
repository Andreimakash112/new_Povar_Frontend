
import React, { useEffect, useState } from 'react';
import './Admin/AdminData';

import BasProd from './BasProd';


function MenuCard() {
  const [cards, setCards] = useState([]);
  const baseUrl = 'http://localhost:9001';

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/cards`);
      if (!response.ok) {
        console.error('Fetch cards failed', response.status);
        return;
      }
      const data = await response.json();
      setCards(data);
    } catch (err) {
      console.error('Error fetching cards', err);
    }
  };

  const getImageSrc = (imagePath) => {
    if (!imagePath) return '/placeholder.png';
    return imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`;
  };

  return (
    <div className="Menu">
      <div className="container">
        {cards.length === 0 ? (
          <p>Карточек нет</p>
        ) : (
          cards.map(card => (
            <div className="cardName" key={card._id}>
              <div className="card__item">
                <div className="card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2>{card.title}</h2>
                </div>

                {card.image ? (
                  <img
                    className="card__img"
                    src={getImageSrc(card.image)}
                    alt={card.title}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.png'; }}
                  />
                ) : (
                  <img className="card__img" src="/placeholder.png" alt="placeholder" />
                )}

                <div className="card__body">
                
 <BasProd cardId={card._id}/>
  

                </div>



              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MenuCard;