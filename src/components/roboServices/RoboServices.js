import React from 'react';
import SVG from 'react-inlinesvg';
import styles from './styles.scss';
import service1 from './assets/service1.svg';
import service2 from './assets/service2.svg';
import service3 from './assets/service3.svg';
import service4 from './assets/service4.svg';

const services = [
  {
    service_id: '1',
    image: service1,
    description: 'Начни продажи прямо сейчас',
    url: 'https://start.robo.market/?_ga=2.207975186.1050325554.1590396282-433838939.1584601103',
  },
  {
    service_id: '2',
    image: service2,
    description: 'Преврати свой Instagram в  магазин',
    url: 'https://insta.robo.market/?_ga=2.207975186.1050325554.1590396282-433838939.1584601103',
  },
  {
    service_id: '3',
    image: service3,
    description: 'Продай вебинары и цифровые товары',
    url: 'https://start.robo.market/?_ga=2.207975186.1050325554.1590396282-433838939.1584601103',
  },
  {
    service_id: '4',
    image: service4,
    description: 'Продай билеты на мероприятия',
    url: 'https://start.robo.market/?_ga=2.207975186.1050325554.1590396282-433838939.1584601103',
  },
];

const RoboServices = (props) => {
  return (
    <div className={styles.services}>
      {services.map((service) => (
        <Service key={service.title} service={service} />
      ))}
    </div>
  );
};

export default RoboServices;

const Service = ({ service }) => {
  return (
    <>
      <a href={service.url} className={styles.service}>
        <div className={styles.title}>{service.description}</div>
        <div className={styles.imageContainer}>
          <SVG style={{ margin: '0', width: '250px' }} src={service.image} />
        </div>
      </a>
    </>
  );
};
