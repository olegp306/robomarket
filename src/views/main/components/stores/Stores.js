import React, { useEffect, useState } from 'react';
import { MarketButton, Image } from '@robokassa/robomarket-components';
import styles from './styles.scss';
import { callFetchApi } from '../../../../services/asyncApiFetch';

const landingPageUrl = 'https://start.robo.market';

const Store = ({ store }) => {
  const onStoreClickHandler = () => {
    const domain = window.location.hostname;
    window.location = `https://${store.url}.${domain}`;
  };

  return (
    <div role="presentation" className={styles.store} onClick={onStoreClickHandler}>
      <div className={styles.image}>
        <Image className={styles.imageCentred} src={store.logo.url} alt={store.name} />
      </div>
      <div className={styles.name}>{store.name}</div>
      <div className={styles.description}>{store.description}</div>
    </div>
  );
};

const AdvBlock = () => {
  return (
    <div className={styles.store}>
      <div className={styles.adv}>
        <div className={styles.advTitle}>Попробуйте себя в бизнесе с Робо!</div>
        <div className={styles.advAdditionText}>
          Берем на себя чеки <br /> по 54-ФЗ
        </div>
      </div>
      <div className={styles.advDescription}>
        Собственный магазин, более <br />
        20 способов оплаты, не нужна онлайн касса. Комиссия от 0%.
      </div>
      <div className={styles.openBusiness}>
        <a href={landingPageUrl}>
          <MarketButton className={styles.button} type="cancel">
            Открыть свой бизнес
          </MarketButton>
        </a>
      </div>
    </div>
  );
};

const Stores = ({ advBlock, children }) => {
  const [stores, setStoresList] = useState([]);

  const getStores = () => {
    const url = '/merchant/store/main';

    callFetchApi({ url }, { method: 'get' }).then(({ data, error }) => {
      if (!error) {
        setStoresList(data.stores);
      } else {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div className={styles.storesWrapper}>
      {children}
      <div className={styles.stores}>
        {stores.map((store) => (
          <Store key={store.name} store={store} />
        ))}
        {advBlock && <AdvBlock />}
      </div>
    </div>
  );
};

export default Stores;
