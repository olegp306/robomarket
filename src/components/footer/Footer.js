import React from 'react';
import { useHistory } from 'react-router-dom';
import { MarketLogo } from '@robokassa/robomarket-components';
import SocialMediaLinks from './components/socialMediaLinks';
import styles from './Footer.scss';

const footerMenu = [
  {
    title: 'Популярные товары',
    items: [
      {
        name: 'Электроника',
        value: '/catalog?category_name=Электроника',
      },
      {
        name: 'Дом и сад',
        value: '/catalog?category_name=Дом и сад',
      },
      {
        name: 'Детские товары',
        value: '/catalog?category_name=Детские товары',
      },
      {
        name: 'Красота и здоровье',
        value: '/catalog?category_name=Красота и здоровье',
      },
      {
        name: 'Подарки',
        value: '/catalog?category_name=Подарки',
      },
      {
        name: 'Обучение и вебинары',
        value: '/catalog?category_name=Обучение и вебинары',
      },
    ],
  },
  {
    title: 'Популярные услуги',
    items: [
      {
        name: 'Конференции и мероприятия',
        value: '/catalog?category_name=Конференции и мероприятия',
      },
      {
        name: 'Обучение и вебинары',
        value: '/catalog?category_name=Обучение и вебинары',
      },
      {
        name: 'Деловые услуги',
        value: '/catalog?category_name=Деловые услуги',
      },
      {
        name: 'Красота и здоровье',
        value: '/catalog?category_name=Красота и здоровье',
      },
    ],
  },
  {
    title: 'Что такое Робо.Market',
    items: [
      {
        name: 'О проекте',
        value: '/info/whatisrobomarket',
      },
      {
        name: 'Покупателям',
        value: '/info/whatisrobomarket#forbyuers',
      },
      {
        name: 'Часто задаваемые вопросы',
        value: '/info/whatisrobomarket#faq',
      },
      {
        name: 'Контактная информация',
        value: '/info/whatisrobomarket#contacts',
      },
    ],
  },
  {
    title: 'Робо.Маркет для бизнеса',
    items: [
      {
        name: 'Почему на Робо.Маркете выгодно продавать',
        value: '/info/forstores',
      },
      {
        name: 'Продавай в Instagram',
        value:
          'https://insta.robo.market/?_ga=2.238024132.5750246.1587395645-1714881643.1561014411',
      },
      {
        name: 'Документация',
        value: 'https://docs.robo.market/?_ga=2.229634648.5750246.1587395645-1714881643.1561014411',
      },
      // {
      //   name: 'Регистрация',
      //   value: '/login',
      // },
      {
        name: 'Правила для магазинов',
        value:
          'https://docs.robokassa.ru/media/1209/%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%B0-robomarket-%D0%B4%D0%BB%D1%8F-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%D0%B0.pdf?_ga=2.229634648.5750246.1587395645-1714881643.1561014411',
      },
    ],
  },
];
const Footer = () => {
  const history = useHistory();
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerContent}>
        <section className={styles.logoSection}>
          <MarketLogo onClick={() => history.push('/')} />
        </section>
        <div className={styles.horizontalLine} />
        <section className={styles.menuSection}>
          <div className={styles.footerMenu}>
            {footerMenu.map((menu) => (
              <FooterMenu key={menu.title} menu={menu} />
            ))}
          </div>
        </section>
        <div className={styles.horizontalLine} />
        <section className={styles.bottomSection}>
          <div className={styles.supportAndPublicOffer}>
            {/* <a href="/info/whatisrobomarket#support" className={styles.support}> */}
            {/*  Поддержка */}
            {/* </a> */}
            <a
              href="https://docs.robo.market/media/1506/%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5_%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BB%D0%BA_%D0%BF%D0%BE%D0%BA%D1%83%D0%BF%D0%B0%D1%82%D0%B5%D0%BB%D1%8F.pdf"
              className={styles.support}
            >
              Публичная оферта
            </a>
          </div>
          <div className={styles.copyright}>© 2018 – 2020 Robokassa</div>
          <div className={styles.copyright}>
            <SocialMediaLinks />
          </div>
        </section>
      </div>
    </div>
  );
};
export default Footer;

const FooterMenu = ({ menu }) => {
  return (
    <div className={styles.menu}>
      <div className={styles.menuTitle}>{menu.title}</div>
      {menu.items.map((item) => (
        <a key={item.name} href={item.value}>
          <div className={styles.menuItem}>{item.name}</div>
        </a>
      ))}
    </div>
  );
};
