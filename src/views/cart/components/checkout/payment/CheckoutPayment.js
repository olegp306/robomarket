import React from 'react';
import { Image, Loader } from '@robokassa/robomarket-components';
import cn from 'classnames/bind';
import styles from './styles.scss';
import { Currency } from '../../../../../components/formatter/currency';

const CheckoutPayment = ({
  img,
  company,
  storeUrl,
  price,
  deliveryPrice,
  promoDiscount,
  sum,
  currency,
  backHandler,
  onSubmit,
  disableOrder,
  className,
  isPaymentLinkCreating,
  isPaymentLinkCreateError,
}) => {
  return (
    <div className={cn(styles.checkout_payment, className)}>
      <a href={storeUrl} className={styles.title}>
        <div className={styles.img_wrapper}>
          <Image alt="" className={styles.img} src={img} />
        </div>
        <h4 className={styles.title_text}>{company}</h4>
      </a>
      <div className={styles.price_wrapper}>
        <span className={styles.price_text}>Товары</span>
        <span className={styles.price}>{Currency(price, currency)}</span>
      </div>
      <div className={styles.price_wrapper}>
        <span className={styles.price_text}>Доставка</span>
        <span className={styles.price}>{Currency(deliveryPrice, currency)}</span>
      </div>
      {promoDiscount !== 0 && (
        <div className={styles.price_wrapper}>
          <span className={styles.price_text}>Скидка по промокоду</span>
          <span className={styles.price}>{Currency(promoDiscount, currency)}</span>
        </div>
      )}
      <div className={styles.sum_wrapper}>
        <span className={styles.sum_text}>Итого</span>
        <span className={styles.sum}>{Currency(sum - promoDiscount, currency)}</span>
      </div>
      <button
        type="submit"
        className={cn(styles.button, disableOrder && styles.disabledButton)}
        onClick={onSubmit}
        disabled={disableOrder || isPaymentLinkCreating}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Оплатить заказ
          {isPaymentLinkCreating && (
            <div style={{ marginLeft: '15px' }}>
              <Loader size="25px" />
            </div>
          )}
        </div>
      </button>
      {isPaymentLinkCreateError && (
        <div className={cn(styles.error, styles.errorLinkAnimation)}>
          Извините, в настоящее время оплата этого товара недоступна. Пожалуйста, попробуйте
          повторить оплату позже или обратитесь в поддержку.
        </div>
      )}
      <button type="button" className={styles.back_button} onClick={backHandler}>
        Изменить заказ
      </button>
      <span className={styles.notation}>
        Нажимая кнопку «Оплатить заказ» я подтверждаю, что ознакомлен и принимаю{' '}
        <a href="/" className={styles.link}>
          условия использования сервиса
        </a>
      </span>
    </div>
  );
};

export default CheckoutPayment;
