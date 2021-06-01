import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { useHistory } from 'react-router-dom';
import {
  GeoPopupButton,
  MarketIcon,
  MarketLogo,
  SearchProductsInput,
} from '@robokassa/robomarket-components';

import { inject, observer } from 'mobx-react';
import styles from './Header.module.scss';
import BurgerButton from '../burger/burgerButton/BurgerButton';
import RegionPopup from '../geo/geoPopup/GeoPopup';

const Header = ({ geoStore, cartStore, searchValue }) => {
  const history = useHistory();
  const [showPopup, setShowPopup] = useState(false);

  const onChangeFilters = (data) => {
    let newFilter;
    if (data.clear) {
      newFilter = {};
    } else {
      newFilter = { ...data };
    }
    newFilter = {
      ...newFilter,
      page_number: data.page_number ? data.page_number : 1,
    };
    history.push(`/catalog?${qs.stringify(newFilter)}`);
  };

  const changeRegion = (region) => {
    geoStore.setLocation(region);
    geoStore.confirmLocation();
    cartStore.reCalcDelivery(geoStore.currentLocationCode);
    setShowPopup(false);
  };

  useEffect(() => {
    const event = new Event('abcroot-rendered');
    document.dispatchEvent(event);
  }, []);

  return (
    <>
      <header className={styles.header} id="header">
        <div className={styles.headerLeft}>
          <div className={styles.allCategoriesWrapper}>
            <BurgerButton onClick={() => history.push('/categories')} />
          </div>
          <MarketLogo onClick={() => history.push('/')} />
        </div>
        <div className={styles.searchProductWrapper}>
          <SearchProductsInput
            placeholder="Найти в Маркете"
            onSubmit={(data) => onChangeFilters({ text: data })}
            onChange={() => console.log('click icon')}
            value={searchValue}
          />
        </div>
        <div className={styles.headerRight}>
          <div className={styles.geoButton}>
            <GeoPopupButton
              regionName={geoStore.currentLocation}
              isOpen={!geoStore.confirmedLocation}
              onYesClick={() => geoStore.confirmLocation()}
              onNoClick={() => setShowPopup(true)}
            />
          </div>
          <div className={styles.iconsWrapper}>
            <div id="abcroot" />
            <div className={styles.cartIconWrapper}>
              <MarketIcon
                isActive={!cartStore.isEmpty}
                type="cart"
                onClick={() => history.push('/cart')}
              />
            </div>
          </div>
        </div>
      </header>
      {showPopup && (
        <RegionPopup
          geoStore={geoStore}
          changeRegion={changeRegion}
          closeHandler={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default inject('geoStore', 'cartStore')(observer(Header));
