import React from 'react';
import cn from 'classnames/bind';
import styles from './styles.scss';
import { InputField, MaskedInputField } from './Input/Input';
import { PhoneInputField } from './phoneInput/PhoneInput';

const phoneMask = [
  '+',
  /\d/,
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const getTranslate = (error) => {
  const messages = {
    'Field error: bad format.': 'Неверный формат телефона',
    'Not a well-formed email address.': 'Неверный формат.Пример: mail@example.org',
  };
  return <span className={styles.error}> {messages[error] || error} </span>;
};

const CustomerInfo = ({ className, submitError }) => {
  return (
    <div className={cn(styles.checkoutFormWrapper, className)}>
      <h3 className={styles.caption}>Данные покупателя</h3>
      <div>
        <InputField name="name" type="text" label="Фамилия, имя и отчество" />
        <InputField name="email" type="email" label="Электронная почта" />
        {submitError.address && getTranslate(submitError.address[0])}
        <PhoneInputField name="phone" type="phone" label="Номер телефона" />
        {submitError.phone && getTranslate(submitError.phone[0])}
        <InputField name="comment" type="text" label="Комментарий" />
      </div>
    </div>
  );
};
export default CustomerInfo;
