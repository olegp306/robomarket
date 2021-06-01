import { object, string } from 'yup';

const errorRequire = 'Заполните поле';
const errorNameRequired = 'Можете указать ваши ФИО или просто Имя';
const errorPhoneRequired =
  'Введите номер телефона, чтобы продавец мог связаться с вами в случае необходимости ';
const errorEmailRequired =
  'На email придет чек, информация о заказе и ссылка на товар, в случае электронной доставки';

const errorEmailValidation = 'Неверный формат. Пример: mail@example.org';
const errorPhoneValidation = 'Неверный формат. Пример: +74950010203';
const errorMaxLengthValidation = 'Превышено допустимое количество символов';

const phoneRegExp = /^(([+]?\d{1,3})|\d?)[\s(]?[0-9]{3}[\s)]?[0-9]{3}[\s-]?[0-9]{4}$/gm;

const customerInfoRules = {
  name: string().max(150, errorMaxLengthValidation).required(errorNameRequired),
  phone: string().matches(phoneRegExp, errorPhoneValidation).required(errorPhoneRequired),
  email: string().email(errorEmailValidation).required(errorEmailRequired),
  comment: string().max(350, errorMaxLengthValidation),
};

export const deliveryAddressBaseRules = string()
  .max(150, errorMaxLengthValidation)
  .required(errorRequire);

export const emailBaseRules = string().email(errorEmailValidation).required(errorRequire);

const customerDeliveryInfoSchema = object().shape({ ...customerInfoRules });

export const createOrderSchema = (additionFields = {}) =>
  object().shape({ ...additionFields, ...customerInfoRules });

export const getDeliveryInputName = (delivery) => {
  if (delivery.type === 'email') {
    return 'email';
  } else {
    return `${delivery.type}_zoneId_${delivery.zone_id}`;
  }
};

export default customerDeliveryInfoSchema;
