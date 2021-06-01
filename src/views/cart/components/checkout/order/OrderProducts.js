import React, { useState } from 'react';
import styles from './styles.scss';
import DeliverySelectorPopup from '../../basket/deliverySelectorPopup/DeliverySelectorPopup';
import DeliveryProducts from './deliveryProducts/DeliveryProducts';

const OrderProducts = ({ sendData, checkoutErrors, productsGrouped = [], className }) => {
  const prepareData = (item, field) => ({
    products: item.products.map((product) => product._id),
    value: field.target.value,
  });

  const [productToSetup, setProductToSetup] = useState(null);

  const onSetupDelivery = (product) => {
    setProductToSetup(product);
  };

  return (
    <div className={className}>
      <DeliverySelectorPopup
        productToSetup={productToSetup}
        closeHandler={() => setProductToSetup(null)}
      />
      <div className={styles.orderWrapper}>
        {productsGrouped.map((item, index) => (
          <DeliveryProducts
            products={item.products}
            delivery={item.delivery}
            key={item.delivery.zone_id && item.delivery.type_id}
            checkoutErrors={checkoutErrors}
            onSetupDelivery={onSetupDelivery}
            sendData={sendData}
            prepareData={prepareData}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderProducts;
