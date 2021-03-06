import React from 'react';
import cn from 'classnames/bind';
import styles from '../styles.scss';

const BonusesInfo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.subTitleTextWrapper, styles.subTitleText)}>Бонусы</div>

      <div className={styles.contentWrapper}>
        <div className={cn(styles.contentWrapper, styles.boldText)}>Что такое Робобонусы</div>
        Робобонус- это программа лояльности для плательщиков системы приема интернет-платежей
        RoboKassa. Потратить их можно сейчас только на маркетплейсе Робомаркет. Любой продавец из
        сети Robokassa может быстро выложить свои товары и услуги на наш маркетплейс.
      </div>

      <div className={styles.contentWrapper}>
        <div className={cn(styles.contentWrapper, styles.boldText)}>
          Как их получить, какие бывают, как узнать мой баланс
        </div>
        От каждого платежа на любом сайте, подключенном к Robokassa и на маркетплейсе Robo.Market мы
        возвращаем 2% на ваш бонусный счет. 1 бонус = одному Рублю. При регистрации в ЛК заполните
        ваш профиль, указав ФИО и дату рождения – и мы вознаградим вас дополнительными бонусами, а
        на день рождения начислим еще! Если вы ранее платили через Robokassa – у вас точно уже
        накоплены бонусы. Чтобы уточнить сколько их и активировать бонусы- вам нужно
        зарегистрироваться в личном кабинете Robo.Market. После первой покупки вам нужно
        зарегистрироваться в Личном кабинете – и бонусы автоматически будут активированы. У вас есть
        30 дней на это, после чего бонусы сгорят.
      </div>

      <div className={styles.contentWrapper}>
        <div className={cn(styles.contentWrapper, styles.boldText)}>Как потратить бонусы</div>
        Просто положите приглянувшийся товар или услугу на маркетплейсе Robo.market в корзину и
        выберете какое количество бонусов вы хотите потратить. Вы можете оплатить бонусами до 50%
        стоимости корзины. 1Бонус =1 Рублю. Также вы можете потратить Бонусы при покупке у продавцов
        из Казахстана, бонусы будут пересчитаны по курсу ЦБ.
      </div>

      <div className={styles.contentWrapper}>
        <div className={cn(styles.contentWrapper, styles.boldText)}>
          История накопления и сгорания бонусов
        </div>
        Мы создали программу лояльности Робобонусы для того, чтобы вознаградить покупателей системы
        Робокасса за признание нашей работы. В личном кабинете Робомаркета вам доступна история
        накопления и сгорания бонусов по всем операциям, сделанным с момента запуска бонусной
        программы.
      </div>
    </div>
  );
};

export default BonusesInfo;
