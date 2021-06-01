import React from 'react';
import styles from './styles.scss';

const BurgerButton = ({ onClick, onClickMobile }) => {
  return (
    <>
      <div className={styles.burgerWrapper} role="presentation" onClick={onClick}>
        <div className={styles.allCatalogText}>Весь каталог</div>
      </div>
      <div className={styles.burgerWrapperMobile} role="presentation" onClick={onClick} />
    </>
  );
};

export default BurgerButton;
