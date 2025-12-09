
import React, { useEffect, useState } from 'react';
import './Manager.css';


const CART_KEY = 'cart'; // ключ для хранения корзины в localStorage
const ORDERS_KEY = 'orders'; // ключ для хранения истории заказов

// Вспомогательные функции для работы с корзиной
function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Ошибка загрузки корзины из localStorage', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Ошибка сохранения корзины в localStorage', e);
  }
}

function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Ошибка загрузки истории заказов из localStorage', e);
    return [];
  }
}

function saveOrders(orders) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Ошибка сохранения истории заказов в localStorage', e);
  }
}

// Генерация уникального трехзначного номера заказа
function generateUniqueOrderNumber(existingNumbers) {
  while (true) {
    const randomNumber = Math.floor(Math.random() * 900) + 100; // случайное число от 100 до 999
    if (!existingNumbers.includes(randomNumber)) {
      return randomNumber.toString();
    }
  }
}

// Функция добавления товара в корзину
function addProductToCart(product) {
  if (!product || (!product._id && !product.id)) return;
  const currentCart = loadCart();
  const id = product._id ?? product.id;

  const updatedCart = currentCart.map(item => {
    if (item._id === id) {
      return { ...item, quantity: (item.quantity ?? 0) + 1 };
    }
    return item;
  }).concat(currentCart.some(item => item._id === id) ? [] : [{
    _id: id,
    title: product.title ?? '',
    price: product.price ?? 0,
    quantity: 1
  }]);

  saveCart(updatedCart);

  window.dispatchEvent(new Event('cartUpdated')); // оповещение о новом изменении
}

// Увеличение количества товара
function increaseQuantity(id) {
  const currentCart = loadCart();

  const updatedCart = currentCart.map(item => {
    if (item._id === id) {
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });

  saveCart(updatedCart);

  window.dispatchEvent(new Event('cartUpdated')); // оповещение о новом изменении
}

// Уменьшение количества товара
function decreaseQuantity(id) {
  const currentCart = loadCart();

  const updatedCart = currentCart.map(item => {
    if (item._id === id) {
      if (item.quantity <= 1) {
        return undefined; // удаляем товар, если количество стало 0
      }
      return { ...item, quantity: item.quantity - 1 };
    }
    return item;
  }).filter(Boolean); // фильтруем элементы, ставшие неопределенными (undefined)

  saveCart(updatedCart);

  window.dispatchEvent(new Event('cartUpdated')); // оповещение о новом изменении
}

// Полное удаление товара
function removeFromCart(id) {
  const currentCart = loadCart().filter(item => item._id !== id);

  saveCart(currentCart);

  window.dispatchEvent(new Event('cartUpdated')); // оповещение о новом изменении
}

// Создание нового заказа (очистка корзины и формирование нового заказа)
function createNewOrder() {
  const cart = loadCart();
  if (cart.length === 0) return;

  const orders = loadOrders();
  const existingNumbers = orders.map(order => parseInt(order.number)); // существующие номера заказов

  const orderNumber = generateUniqueOrderNumber(existingNumbers); // Генерируем уникальный номер заказа

  const newOrder = {
    number: orderNumber,
    items: [...cart], // копируем текущую корзину
    createdAt: new Date(), // фиксируем время создания заказа
  };

  saveOrders([...orders, newOrder]); // сохраняем новый заказ в историю

  saveCart([]); // очищаем текущую корзину после оформления заказа

  window.dispatchEvent(new Event('orderCreated')); // оповещение о новом заказе
}


// Удаление заказа из истории
function deleteOrder(number) {
  const orders = loadOrders().filter(order => order.number !== number);

  saveOrders(orders);

  window.dispatchEvent(new Event('orderDeleted')); // оповещение о удалённом заказе
}

// Удаление корзины и истории при выходе из аккаунта (при отсутствии токена)
function clearLocalStorageIfNoToken() {
  const token = localStorage.getItem('token'); // Проверяем наличие токена
  if (!token) {
    localStorage.removeItem(CART_KEY); // Удаляем корзину
    localStorage.removeItem(ORDERS_KEY); // Удаляем историю заказов
  }
}

// Общая сумма товаров в корзине
function totalItemsInCart() {
  const cart = loadCart();
  return cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
}

// Основной компонент
function Manager() {
  const [cart, setCart] = useState(loadCart());
  const [orders, setOrders] = useState(loadOrders());

  useEffect(() => {
    // Очистка данных при отсутствии токена
    clearLocalStorageIfNoToken();

    // Первоначальная подгрузка данных корзины и истории заказов
    const initialCart = loadCart();
    const initialOrders = loadOrders();
    setCart(initialCart);
    setOrders(initialOrders);

    // Обновляем корзину при изменениях
    const handleStorageChange = () => {
      setCart(loadCart());
    };

    // Обновляем корзину при собственных событиях (добавление, удаление товаров)
    const handleCustomEvent = (event) => {
      if (event.type === 'cartUpdated') {
        setCart(loadCart());
      }
    };

    // Обновляем историю заказов при оформлении нового заказа
    const handleOrderCreated = () => {
      setOrders(loadOrders());
    };

    // Обновляем историю заказов при удалении заказа
    const handleOrderDeleted = () => {
      setOrders(loadOrders());
    };

    // Регистрация обработчиков событий
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCustomEvent);
    window.addEventListener('orderCreated', handleOrderCreated);
    window.addEventListener('orderDeleted', handleOrderDeleted);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCustomEvent);
      window.removeEventListener('orderCreated', handleOrderCreated);
      window.removeEventListener('orderDeleted', handleOrderDeleted);
    };
  }, []);

 return (
    <div className='Manager'>
      <h2>Оформление заказа</h2>
      {cart.length === 0 && <p>Корзина пуста</p>}
      {cart.length > 0 && (
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              {item.title} — {item.quantity} × {item.price} ₽
              {' '}
< div className='ButtonBask'>
  
              <button onClick={() => increaseQuantity(item._id)}>
                +
              </button>{' '}
              <button onClick={() => decreaseQuantity(item._id)}>
                —
              </button>{' '}
              <button onClick={() => removeFromCart(item._id)}>
                Удалить
              </button>
</div>

            </li>
          ))}
        </ul>
      )}
      <p>Общее количество товаров в корзине: {totalItemsInCart()}</p>
      <button disabled={cart.length === 0} onClick={createNewOrder}>
        Оформить заказ
      </button>

      <hr />
      <h2>История заказов:</h2>
      {orders.length === 0 && <p>Пока нет оформленных заказов</p>}
      {orders.length > 0 && (
        <ol>
          {orders.map((order) => (
            <li key={order.number}>
              Номер заказа: {order.number}, Дата: {new Date(order.createdAt).toLocaleString()}
              <button onClick={() => deleteOrder(order.number)}>
                Удалить заказ
              </button>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.title}: {item.quantity} × {item.price} ₽
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

// Экспортируем функцию addProductToCart
export { addProductToCart };

// Экспорт самого компонента
export default Manager;