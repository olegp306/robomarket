import React, { useState, useEffect } from 'react';
import { MarketButton } from '@robokassa/robomarket-components';
import { useHistory } from 'react-router-dom';
import LoaderWrapper from '../../components/loader/LoaderWrapper';
import styles from './styles.scss';
import { callFetchApi } from '../../services/asyncApiFetch';

import OrderList from './components/orderList';
import OrderTotal from './components/orderTotal';

const Order = ({ search }) => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState();
  const [userOrder, setUserOrder] = useState({ customer: {}, products: [] });

  const fetchOrderInfo = () => {
    setIsLoading(true);
    const url = `/order/result${search}`;

    callFetchApi({ url }, { method: 'get' }).then(({ data, error }) => {
      if (!error && data.success) {
        setUserOrder(data.item);
      }
      setIsSuccess(data.success);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchOrderInfo();
  }, []);

  const orderStatusMap = {
    new: 'Новый',
    done: 'Выполненный',
    canceled: 'Отмененный',
  };

  const productsCost =
    isSuccess && userOrder.products.reduce((total, item) => total + Number(item.cost), 0);

  const totalDiscount =
    isSuccess &&
    userOrder.discounts &&
    userOrder.discounts.reduce((total, item) => total + Number(item.amount), 0);

  const onStoreClickHandler = () => {
    history.push(`/store/${userOrder.store?._id}`);
  };

  return (
    <div className={styles.orderSuccessWrapper}>
      <LoaderWrapper isLoading={isLoading} title="Загрузка заказа">
        {isSuccess ? (
          <>
            <h1 className={styles.orderSuccessTitle}>Спасибо за заказ!</h1>
            <div className={styles.orderSuccessText}>
              Ваш заказ успешно оплачен и передан продавцу.
            </div>
            <div className={styles.orderSuccessText}>
              Информация о заказе и чек об оплате были отправлены на почту, указанную при оформлении
              заказа: {userOrder.customer?.email}
            </div>
            <div className={styles.orderInfo}>
              <div className={styles.title}>
                <h2 className={styles.titleText}>Заказ №{userOrder.number}</h2>
                <MarketButton size="extraSmall">
                  {orderStatusMap[userOrder.order_status]}
                </MarketButton>
              </div>
              <div className={styles.orderDetailWrapper}>
                <div className={styles.orderPersonalData}>
                  <h3 className={styles.subTitle}>Данные заказа</h3>
                  <div>{userOrder.customer?.name}</div>
                  <div>{userOrder.customer?.phone}</div>
                  <div>{userOrder.customer?.email}</div>
                </div>
                <OrderList orderProducts={userOrder.products} />
              </div>
              <OrderTotal
                className={styles.orderTotal}
                userOrder={userOrder}
                currency={userOrder.products[0].currency}
                productsCost={productsCost}
                totalDiscount={totalDiscount}
                onStoreClickHandler={onStoreClickHandler}
              />
            </div>
          </>
        ) : (
          <h1 className={styles.orderSuccessTitle}>Заказ не найден.</h1>
        )}
      </LoaderWrapper>
    </div>
  );
};

export default Order;
