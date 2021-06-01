import React from 'react';
import cn from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import styles from './styles.scss';
import Checkout from '../checkout/CheckoutCart';
import OrderPopupView from './popup/OrderPopup';
import SummaryView from './summary/SummaryView';
import { Col, Row } from '../../../../components/grid/grid';
import ProductInCart from './productInCart/ProductInCart';

const BasketOrder = ({
  data,
  isActive,
  hideHandler,
  startCheckout,
  onSetupDelivery,
  cartStore,
  isLast,
}) => {
  const increaseCount = (productId) => cartStore.increaseCount(productId);
  const decreaseCount = (productId) => cartStore.decreaseCount(productId);

  const disableOrder =
    data.products.filter(
      (item) => item.delivery.mustSetup === true || item.delivery.unable === true,
    ).length > 0;

  return isActive ? (
    <article className={cn(styles.order, styles.smoothAppearance)}>
      <div className={styles.horizontalLine} />
      <Checkout
        data={data}
        currency={data.products[0].currency}
        backHandler={() => hideHandler(null)}
      />
    </article>
  ) : (
    <article className={cn(styles.order, styles.smoothAppearance)}>
      <div className={styles.horizontalLine} />
      {startCheckout && <OrderPopupView />}
      <h2 className={styles.title}>{data.shop}</h2>
      <div className={styles.main}>
        <div className={styles.goods}>
          {disableOrder && (
            <div className={styles.disableOrderNotification}>
              Невозможно оформить заказ. Необходимо изменить способ доставки или удалить товар.
            </div>
          )}
          {data.products.map((product, index) => (
            <ProductInCart
              product={product}
              onRemoveFromBasket={(productId) => cartStore.deleteProduct(productId)}
              onSetupDelivery={onSetupDelivery}
              increaseCount={increaseCount}
              decreaseCount={decreaseCount}
              key={product._id}
              isLast={data.products.length - 1 === index}
            />
          ))}
        </div>
        <SummaryView data={data} hideHandler={hideHandler} disableOrder={disableOrder} />
      </div>
      {isLast && <div className={styles.horizontalLine} />}
    </article>
  );
};

export default inject('cartStore')(observer(BasketOrder));
