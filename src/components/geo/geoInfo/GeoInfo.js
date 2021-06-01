import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import styles from './styles.scss';
import RegionPopup from '../geoPopup/GeoPopup';

const GeoInfo = ({ allowChange = true, recalcCart = true, geoStore, cartStore }) => {
  const [showPopup, setShowPopup] = useState(false);

  const changeRegion = (region) => {
    geoStore.setLocation(region);
    geoStore.confirmLocation();
    recalcCart && cartStore.reCalcDelivery(geoStore.currentLocationCode);
    setShowPopup(false);
  };

  return (
    <div className={styles.wrapper}>
      <span>Регион доставки:</span>
      <span className={styles.regionName} onClick={() => setShowPopup(true)} role="presentation">
        {geoStore.currentLocation}
      </span>
      {allowChange && showPopup && (
        <RegionPopup
          geoStore={geoStore}
          closeHandler={() => setShowPopup(false)}
          changeRegion={changeRegion}
        />
      )}
    </div>
  );
};

export default inject('cartStore', 'geoStore')(observer(GeoInfo));
