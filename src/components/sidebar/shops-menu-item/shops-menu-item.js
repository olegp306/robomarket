import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './styles.scss';
import sidebarStyles from '../styles.scss';
import arrow from '../arrow.png';

const ShopsMenuItem = ({ name, storeId }) => {
  const id = name.replace(/[^A-Za-z0-9]/g, '');

  const menuLinks = [
    { label: 'Заказы', url: `/order/${storeId}` },
    { label: 'Товары', url: `/product/${storeId}` },
    { label: 'Загрузки', url: `/load/${storeId}` },
    { label: 'Доставка', url: `/delivery/${storeId}` },
    { label: 'Настройки', url: `/settings/${storeId}` },
    { label: 'Поддержка', url: `/support/${storeId}` },
    { label: 'Реклама', url: `/advertisement/${storeId}` },
  ];

  const renderMenuItem = (label, url) => {
    return (
      <li>
        <NavLink activeClassName={cn(styles.isActive)} to={url}>
          {label}
        </NavLink>
      </li>
    );
  };

  return (
    <div className={cn(styles.sidebar__shop__item__button)}>
      <input type="radio" name="rd" id={`shop__item__checkbox__${id}`} />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className={cn(styles.sidebar__shop__item__button__label)}
        htmlFor={`shop__item__checkbox__${id}`}
      >
        <span
          className={cn(
            sidebarStyles.sidebar__text,
            sidebarStyles.sidebar__item,
            styles.sidebar__shop__item__name,
          )}
        >
          {name}
        </span>
        <img src={arrow} className={cn(styles.sidebar__shop__item__button__arrow)} alt="arrow" />
      </label>
      <div className={cn(styles.sidebar__shop__item__button__content)}>
        <ul className={cn(sidebarStyles.sidebar__text, sidebarStyles.sidebar__item)}>
          {menuLinks.map((itm) => renderMenuItem(itm.label, itm.url))}
        </ul>
      </div>
    </div>
  );
};

export default ShopsMenuItem;
