import React from 'react';
import { Image } from '@robokassa/robomarket-components';
import styles from './styles.scss';

const RoboServices = ({ services }) => {
  return (
    <div>
      <div className={styles.servicesTitle}>Сервисы Робо.Маркета</div>
      <div className={styles.services}>
        {services.map((service) => (
          <Service key={service.title} service={service} />
        ))}
      </div>
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
          <Image className={styles.image} src={service.imageUrl} alt={service.description} />
        </div>
      </a>
    </>
  );
};
