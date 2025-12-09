
import React, { useEffect, useState } from 'react';
import './Product.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:9001/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const addProduct = async () => {
    if (newTitle.trim() === '' || newDescription.trim() === '' || newPrice.trim() === '') {
      return alert('Введите заголовок, описание и цену');
    }
    const response = await fetch('http://localhost:9001/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, description: newDescription, price: newPrice })
    });
    if (response.ok) {
      const createdProduct = await response.json();
      setProducts([...products, createdProduct]);
      setNewTitle('');
      setNewDescription('');
      setNewPrice('');
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
          placeholder="Описание"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
     />
        <input
          type="text"
          placeholder="Цена"
          value={newPrice}
          onChange={e => setNewPrice(e.target.value)}
        />
        <button onClick={addProduct}>Добавить продукт</button>
      </div>

      <ul>
        {products.map(product => (
          <li className="card__item" key={product.id || product._id}>
            <div className="card__title">{product.title}</div>
            <div className="card__description">{product.description}</div>
            <div className="card__price">{product.price}₽</div>
            {/* Добавь функцию покупки если нужна */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Product;


