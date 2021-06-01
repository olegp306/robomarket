import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './styles.scss';
import BurgerButton from '../burger/burgerButton/BurgerButton';

const CatalogMenu = () => {
  const history = useHistory();

  const menuLinks = [
    { label: 'Электроника', value: 'electronic' },
    { label: 'Дом и сад', value: 'houseandgarden' },
    { label: 'Детские товары', value: 'children' },
  ];

  return (
    <div className={styles.catalogHeaderWrapper}>
      <div className={styles.catalogMenuWrapper}>
        <BurgerButton onClick={() => history.push('/categories')} />
        {menuLinks.map((item) => (
          <MenuItem
            key={item.value}
            onClick={() => history.push(`/catalog?category_name=${item.label}`)}
          >
            {item.label}
          </MenuItem>
        ))}
      </div>
      <Link to="/info/whatisrobomarket" className={styles.whatIsRobomarket}>
        Что такое Робо.Маркет?
      </Link>
    </div>
  );
};

export default CatalogMenu;

const MenuItem = ({ children, onClick }) => (
  <div className={styles.menuItemText} onClick={onClick} role="presentation">
    {children}
  </div>
);

// export const BurgerButton = ({onClick}) => (
//   <div className={styles.allCatalogMenuItem} role="presentation" onClick={onClick}>
//     <div className={styles.allCatalogText}>Весь каталог</div>
//   </div>
// );
