import React from 'react';
import cn from 'classnames/bind';
import styles from './styles.scss';
import GeoInfo from '../../../../../components/geo/geoInfo/GeoInfo';

const CartHeader = ({ emptyCart }) => {
  return (
    <div className={styles.store__header}>
      <div className={styles.title}>
        <h1>
          <a href="/" className={cn(styles.caption, styles.active)}>
            Корзина
          </a>
        </h1>
      </div>
      <div className={styles.main}>
        <GeoInfo />
        <div role="presentation" className={styles.clear} onClick={emptyCart}>
          Очистить корзину
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
