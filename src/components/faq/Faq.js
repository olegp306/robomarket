import React from 'react';
import styles from './styles.scss';

const Faq = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Часто задаваемые вопросы</h2>

      <h4>Почему после добавления товара в корзину цена изменилась? </h4>
      <p>
        Возможно так случилось, что в момент когда вы уже положили товар в корзину, продавец изменил
        цену. После оформления заказа цена измениться не может.
      </p>

      <h4>Какими способами можно оплатить заказ? </h4>
      <p>
        Для оплаты доступны все способы из арсенала ROBOKASSA, а именно: банковская карта,
        электронные кошельки, счет мобильного телефона, интернет-банки, терминалы оплаты, салоны
        связи и другие.
      </p>

      <h4> Как узнать статус заказа?</h4>
      <p>
        Для уточнения статуса заказа связывайтесь напрямую с магазином, реализующим товар, его
        контактные данные есть в письме-уведомлении о подтверждении заказа.
      </p>

      <h4>Как изменить заказ?</h4>
      <p>
        Для изменения заказа связывайтесь напрямую с магазином, реализующим товар, его контактные
        данные есть в письме-уведомлении о подтверждении заказа.
      </p>

      <h4>Как отменить заказ?</h4>
      <p>
        Для отмены заказа связывайтесь напрямую с магазином, реализующим товар, его контактные
        данные есть в письме-уведомлении о подтверждении заказа.
      </p>

      <h4>
        Мне пришло уведомление, что заказ отменен магазином. Почему магазин отменил заказ без моего
        ведома?
      </h4>
      <p>
        Если заказ был отменен, денежные средства будут возвращены в полном объёме. Возможные
        причины отмены заказа:
        <ul>
          <li>Менеджер не смог связаться с покупателем</li>
          <li>Товар закончился, и магазин не в состоянии исполнить обязательства</li>
        </ul>
      </p>

      <h4>Как будут доставляться заказы из разных магазинов?</h4>
      <p>
        Доставку товаров из заказа осуществляет каждый магазин самостоятельно, для доставки будет
        использован метод, указанный вами при оформлении заказа.
      </p>

      <h4> Можно ли оформить одну общую доставку для заказов из нескольких магазинов?</h4>
      <p> Нет, каждый магазин, участвующий в заказе, осуществляет доставку самостоятельно.</p>

      <h4> Какие уведомления я буду получать?</h4>
      <p>
        После оплаты вы получите письмо-уведомление о подтверждение заказа. Ваши контакты,
        оставленные при оформлении заказа, будут переданы магазину, при необходимости магазин может
        использовать их для связи с покупателем.
      </p>

      <h4>Как связаться с магазином? </h4>
      <p>Контактные данные магазина указаны в письме-уведомлении о подтверждении заказа. </p>

      <h4>Возникли проблемы с заказом. Что делать? </h4>
      <p>
        При возникновении вопросов по заказу, связывайтесь напрямую с магазином, его контактные
        данные есть в письме-уведомлении о подтверждении заказа. Если с магазином не удается
        связаться или магазин отказывается от сотрудничества, обратитесь в поддержку Robo.market
        через запрос в поддержку.
      </p>
    </div>
  );
};

export default Faq;