import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import cn from 'classnames/bind';

import { Logo, ProfileDropdown } from '@robokassa/robomarket-components';
import styles from './styles.scss';
import ShopsMenuItem from './shops-menu-item';

const Sidebar = ({ merchantStore }) => {
  const stores = merchantStore.stores.map((item) => {
    const { name, _id } = item;
    return <ShopsMenuItem key={name} name={name} storeId={_id} />;
  });

  return (
    <div className={cn(styles.sidebar)}>
      <ProfileDropdown title={merchantStore.merchant.username} />
      <div className={cn(styles.sidebar__shop__title)}>
        <span
          className={cn(
            styles.sidebar__item,
            styles.sidebar__text,
            styles.sidebar__shop__title__text,
          )}
        >
          МОИ МАГАЗИНЫ
        </span>
      </div>

      <div>{stores}</div>

      <div className={cn(styles.sidebar__item, styles.sidebar__hr)} />

      <div className={cn(styles.sidebar__item, styles.sidebar__logo)}>
        <Logo />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  merchantStore: PropTypes.object.isRequired,
};

export default inject('merchantStore')(observer(Sidebar));
