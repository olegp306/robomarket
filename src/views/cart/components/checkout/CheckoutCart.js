import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Formik } from 'formik';
import cn from 'classnames/bind';
import OrderProducts from './order/OrderProducts';

import {
  getDeliveryInputName,
  createOrderSchema,
  deliveryAddressBaseRules,
  emailBaseRules,
} from './validation';

import CustomerDeliveryForm from './customerDeliveryForm/CustomerDeliveryForm';
import CheckoutPayment from './payment/CheckoutPayment';
import styles from './styles.scss';
import { callFetchApi } from '../../../../services/asyncApiFetch';

import { countAmount, countDelivery } from '../basket/Helpers';
import PromoForm from './promoForm/PromoForm';

const CheckoutMain = inject('cartStore')(
  observer(({ detailedData, currency, backHandler, cartStore }) => {
    const [submitError, setSubmitError] = useState({});
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [isPaymentLinkCreating, setIsPaymentLinkCreating] = useState(false);
    const [isPaymentLinkCreateError, setIsPaymentLinkCreateError] = useState(false);

    const detailedProducts = detailedData.products.filter(
      (item) => item.delivery.mustSetup === undefined && item.delivery.unable === undefined,
    );

    const [price, setPrice] = useState(countAmount(detailedProducts));
    const [deliveryPrice, setDeliveryPrice] = useState(countDelivery(detailedProducts));

    const getProductsGroupedByDelivery = (products) => {
      const uniqTypes = [
        ...new Set(
          products.filter((item) => !item.delivery.zone).map((product) => product.delivery.type),
        ),
      ];
      const uniqZones = [
        ...new Set(
          products.filter((item) => item.delivery.zone).map((product) => product.delivery.zone),
        ),
      ];
      const productsByTypes = uniqTypes.map((type) => ({
        delivery: products.filter((product) => product.delivery.type === type)[0].delivery,
        products: products.filter((product) => product.delivery.type === type),
      }));
      const productsByZones = uniqZones.map((zone) => ({
        delivery: products.filter((product) => product.delivery.zone === zone)[0].delivery,
        products: products.filter((product) => product.delivery.zone === zone),
      }));

      return [...productsByTypes, ...productsByZones];
    };
    const productsGrouped = getProductsGroupedByDelivery(detailedData.products);
    const filteredDeliveries = productsGrouped.filter(
      (item) => item.delivery.type !== 'email' && item.delivery.type !== 'pickup',
    );
    const onSubmitPromoCode = (promoInfo) => {
      setPromoCode(promoInfo.promoCode);
      setPromoDiscount(
        Math.floor((((price + deliveryPrice) * promoInfo.percent) / 100) * 100) / 100,
      );
    };

    useEffect(() => {
      setPrice(countAmount(detailedProducts));
      setDeliveryPrice(countDelivery(detailedProducts));
    });

    const getDeliveryAddress = (delivery, values) => {
      if (delivery.type === 'pickup') {
        return delivery.zone;
      }
      if (delivery.type === 'email') {
        return values.email;
      }
      const inputFieldName = getDeliveryInputName(delivery);
      return values[inputFieldName];
    };

    const prepareProducts = (products, values) => {
      return products.map((product) => ({
        _id: product._id,
        amount: product.count,
        delivery: {
          _id: product.delivery.type_id,
          type_name: product.delivery.type,
          zone: product.delivery.zone,
          zone_id: product.delivery.zone_id,
          address: getDeliveryAddress(product.delivery, values),
        },
      }));
    };

    const prepareErrors = (error) => {
      const errorObj = error.reduce((m, e) => Object.assign(m, { [e.source]: e.messages }), {});
      if (errorObj.products) {
        const productErrors = Object.keys(errorObj.products).map((item) => errorObj.products[item]);
        errorObj.products = Object.assign({}, ...productErrors);
      }
      const { customer, products, ...errors } = errorObj;
      if (Object.keys(errorObj).find((i) => errorObj[i] === 'Invalid payment link')) {
        setIsPaymentLinkCreateError(true);
      }

      return { ...errors, ...customer, ...products?.delivery };
    };

    const formSubmit = (values) => {
      const url = '/order';
      const requestData = {
        customer: {
          name: values.name,
          email: values.email,
          phone: values.phone.replace(/[^0-9.]/g, ''),
        },
        store_id: detailedData.shop_id,
        products: prepareProducts(detailedData.products, values),
        comment: values.comment,
        promo: promoCode,
      };
      setIsPaymentLinkCreating(true);
      setIsPaymentLinkCreateError(false);
      return callFetchApi({ url }, { method: 'post', body: requestData }).then(
        ({ data, error }) => {
          setIsPaymentLinkCreating(false);
          if (!error) {
            cartStore.deleteShopComplete(detailedData.shop_id);
            window.location = data.payment_link;
          } else {
            setSubmitError(prepareErrors(error.result.errors));
          }
        },
      );
    };

    const getOrderSchema = () => {
      const addressesInputsSchema = {};
      filteredDeliveries.forEach((item) => {
        const inputName = getDeliveryInputName(item.delivery);
        addressesInputsSchema[inputName] =
          inputName === 'email' ? emailBaseRules : deliveryAddressBaseRules;
      });
      return createOrderSchema(addressesInputsSchema);
    };

    const getDynamicAddressFields = () => {
      const fields = {};
      filteredDeliveries.forEach((item) => {
        const inputName = getDeliveryInputName(item.delivery);
        fields[inputName] = '';
      });
      return fields;
    };

    const disableOrder =
      detailedData.products.filter(
        (item) => item.delivery.mustSetup === true || item.delivery.unable === true,
      ).length > 0;

    const initialValues = {
      name: '',
      email: '',
      phone: '',
      comment: '',
      ...getDynamicAddressFields(),
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={formSubmit}
        validationSchema={getOrderSchema()}
      >
        {(props) => (
          <div className={cn(styles.order, styles.smoothAppearance)}>
            <OrderProducts
              productsGrouped={productsGrouped}
              checkoutErrors={submitError}
              onSubmit={props.handleSubmit}
              className={styles.column}
            />

            <div className={styles.column}>
              <CustomerDeliveryForm className={styles.border} submitError={submitError} />
              <PromoForm
                title="Дополнительно"
                onSubmitPromoCode={onSubmitPromoCode}
                storeId={detailedData.store_id}
                className={styles.border}
              />
            </div>

            <CheckoutPayment
              img={detailedData.img}
              company={detailedData.shop}
              storeUrl={`/store/${detailedData.shop_id}`}
              price={price}
              deliveryPrice={deliveryPrice}
              promoDiscount={promoDiscount}
              sum={price + deliveryPrice}
              currency={currency}
              backHandler={backHandler}
              onSubmit={props.handleSubmit}
              disableOrder={disableOrder}
              isPaymentLinkCreating={isPaymentLinkCreating}
              isPaymentLinkCreateError={isPaymentLinkCreateError}
            />
          </div>
        )}
      </Formik>
    );
  }),
);

const CheckoutHeader = () => {
  return (
    <div className={styles.checkout_header}>
      <h2 className={styles.title}>Оформление заказа</h2>
    </div>
  );
};

const Checkout = ({ data, currency, backHandler }) => {
  return (
    <section className="checkout">
      <CheckoutHeader />
      <CheckoutMain detailedData={data} currency={currency} backHandler={backHandler} />
    </section>
  );
};

export default Checkout;
