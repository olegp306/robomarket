import React from 'react';
import styles from './styles.scss';

const ProductsInfo = () => {
  return (
    <div className={styles.wrapper}>
      <h2> Товары </h2>

      <h4> Как найти и купить товар в Робомаркете </h4>
      <p>
        {' '}
        Вы можете найти интересующий вас товар в поисковой строке, через меню разделов, по ключевым
        словам. Вы можете добавить интересующие вас товары в избранное, чтобы оплатить его потом.
        Если вы определились с покупкой - положите товар в корзину и нажмите оформить заказ. Если
        товар продается с доставкой - выберите вариант доставки. Далее введите контактные данные и
        данные о вашем расположении для доставки. Обратите внимание, что вы предоплачиваете доставку
        напрямую продавцу. Далее нажмите Оплатить заказ- и вы будете переведены на платежную
        страницу сервиса приема интернет-платежей Робокасса, где вы можете выбрать удобный вам
        способ оплаты, в том числе покупка в рассрочку. После успешной оплаты вы вернетесь в
        корзину, где будет отмечен статус заказа - а вам на почту придет письмо с подтверждением
        факта оплаты в магазин - и чек о покупке.
      </p>

      <h4> Какие бывают товары (подводка к следующему пункту)</h4>
      <p>
        {' '}
        На маркетплейсе Робомаркет доступны товары от продавцов сервиса приема интернет-платежей
        Робокасса, как физические товары с доставкой, так и услуги. В вашем распоряжении большой
        спектр товаров в области обучения и развития, такие товары продаются с электронной доставкой
        - вам или сразу придет на е-мейл доступ к оплаченному товару - или же с вами свяжется
        продавец и сообщит необходимую информацию по заказу.
      </p>

      <h4>Почему тут нет товара от продавца из Robokassa? </h4>
      <p>
        {' '}
        Любой продавец, подключенный к системе Робокасса может в два клика выложить свои товары и
        предложения на Робо.Маркет, для получения продаж из дополнительного канала. При этом
        покупатель, имеющий покупки в Робокасса получает 2% кешбека на покупки в Робомаркет.
        Подробнее про Бонусы. Это происходит без денежных вложений со стороны продавца. Если вы не
        нашли интересующий вас - просто сообщите о своем желании купить товар на робомаркете
        продавцу.
      </p>
    </div>
  );
};

export default ProductsInfo;
