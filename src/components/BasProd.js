
import React, { useEffect, useState } from 'react';
import { addProductToCart } from './Basket/Manager';

function BasProd({ cardId }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = 'http://localhost:9001';

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/products`);
        if (!response.ok) throw new Error('Ошибка при загрузке продуктов');
        const data = await response.json();
        const filtered = cardId ? data.filter((p) => p.cardId === cardId) : data;
        setProducts(filtered);
      } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
        alert('Ошибка при загрузке продуктов');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [cardId]);

  const BuyButton = ({ product }) => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      return (
        <button onClick={() => {
          addProductToCart(product);
          alert("ПРОДУКТ ДОБАВЛЕН В КОРЗИНУ");
        }}>
          Купить
        </button>
      );
    }
    return null;
  };

  return (
    <div> 
      {isLoading && <p>Загрузка...</p>}
      {!isLoading && products.length === 0 && <p>Нет продуктов</p>}
      {!isLoading && products.length > 0 && (
        <ul>
          {products.map((p) => (
            <li key={p._id ?? p.id}>
              <div className="card__title">{p.title}</div>
              <div className="card__description">{p.description}</div>
              <div className="card__price">Цена: {p.price} ₽</div>
              <BuyButton product={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BasProd;

