import React from 'react';
import styles from './styles.scss';

const OrderPopupView = () => (
  <div className={styles.popup}>
    <span className={styles.text}>
      <a href="/" className={styles.link}>
        Завершите оформление заказа
      </a>
      , чтобы продолжить покупку остальных товаров из корзины
    </span>
  </div>
);

export default OrderPopupView;
