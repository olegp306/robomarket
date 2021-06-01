import React from 'react';
import styles from './styles.scss';

const PageNotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Такой страницы нет</h2>
      <h3>
        Зато у нас есть много других страниц — например, <a href="/">главная </a>!{' '}
      </h3>
    </div>
  );
};

export default PageNotFound;
