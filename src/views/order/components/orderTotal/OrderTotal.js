import React from 'react';
import cn from 'classnames/bind';
import { Currency } from '../../../../components/formatter/currency';
import styles from './styles.scss';

const OrderTotal = ({
  className,
  userOrder,
  currency,
  productsCost,
  totalDiscount,
  onStoreClickHandler,
}) => (
  <div className={cn(className, styles.orderTotal)}>
    <div className={styles.merchantTitle} onClick={onStoreClickHandler} role="presentation">
      <h3 className={styles.titleText}>{userOrder.store?.name}</h3>
    </div>
    <div className={styles.orderTotalList}>
      <div className={styles.orderTotalItem}>
        Товары <span>{Currency(productsCost, currency)}</span>
      </div>
      <div className={styles.orderTotalItem}>
        Доставка <span>{Currency(userOrder.delivery_total_cost, currency)}</span>
      </div>
      {Boolean(totalDiscount) && (
        <div className={styles.orderTotalItem}>
          Скидка <span>{Currency(totalDiscount, currency)}</span>
        </div>
      )}
    </div>
    <div className={styles.orderTotalPrice}>
      Итого <span>{Currency(userOrder.total_cost, currency)}</span>
    </div>
  </div>
);

export default OrderTotal;
