import React, { useState, useEffect } from 'react';
import cn from 'classnames/bind';
import { MarketButton } from '@robokassa/robomarket-components';
import styles from './styles.scss';
import { callFetchApi } from '../../../../../services/asyncApiFetch';
import { Input } from '../customerDeliveryForm/Input/Input';

const PromoForm = ({ onSubmitPromoCode, storeId, title, className }) => {
  const [promoCode, setPromoCode] = useState('');
  const [serverError, setServerError] = useState(null);
  const [discountInPercent, setDiscountInPercent] = useState(0);

  const fetchPromoCodeInfo = (code) => {
    const url = '/merchant/promo_code/info';
    return callFetchApi({ url }, { method: 'post', body: { code, store_id: storeId } }).then(
      ({ data, error }) => {
        if (!error) {
          setServerError(null);
          setDiscountInPercent(data.item.discount_percent);
          onSubmitPromoCode({ percent: data.item.discount_percent, promoCode: code });
        } else {
          setServerError(error);
          setDiscountInPercent(0);
          onSubmitPromoCode({ percent: 0, promoCode: '' });
        }
      },
    );
  };

  const onChangeHandler = (el) => {
    setPromoCode(el.target.value);
    setServerError(null);
  };

  return (
    <div className={cn(styles.promoWrapper, className)}>
      {title && <h3 className={styles.caption}>{title} </h3>}
      <div className={styles.row}>
        <Input
          name="promo"
          label="Промо код"
          value={promoCode}
          onChange={(el) => onChangeHandler(el)}
        />

        <MarketButton
          buttonType="button"
          className={styles.promoButton}
          onClick={() => fetchPromoCodeInfo(promoCode)}
          disabled={promoCode === ''}
        >
          Применить
        </MarketButton>
      </div>
      {serverError && <div className={styles.error}> Промокод не найден</div>}
      {discountInPercent !== 0 && (
        <div className={styles.message}> Промокод применён. Скидка {discountInPercent} % </div>
      )}
    </div>
  );
};

export default PromoForm;
