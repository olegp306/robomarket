import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styles from './styles.scss';
import { callFetchApi } from '../../services/asyncApiFetch';
import Products from '../products/Products';
import { FormattedDate } from '../../components/formatter/date';
import Loader from '../../components/loader/Loader';

const StoreNotFound = ({ message }) => {
  return (
    <div className={styles.wrapper}>
      <h2>{message}</h2>
      <h3>
        Пожалуйста, обратитесь
        <a
          href="https://partner.robokassa.ru/Support/Requests"
          rel="noopener noreferrer"
          target="_blank"
        >
          {` в службу поддержки.`}
        </a>
      </h3>
    </div>
  );
};

const Store = ({ storeId, domain, query }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [storeIdData, setStoreIdData] = useState(storeId);
  const [store, setStoreData] = useState({ contacts: [] });
  const [storeError, setStoreError] = useState();

  const getStore = () => {
    const url = domain
      ? `/merchant/store/domain/${domain}/info`
      : `/merchant/store/${storeId}/info`;
    setIsLoading(true);
    callFetchApi({ url }, { method: 'get' }).then(({ data, error }) => {
      if (!error) {
        setStoreData(data.info);
        if (!storeId) {
          setStoreIdData(data.store_id);
          const newDomain = window.location.host.replace(`${domain}.`, '');
          history.push(`/store/${data.store_id}`);
          window.location.host = newDomain;
        }
      } else if (error.status === 404) {
        setStoreError('Магазин не найден или неактивен!');
      } else {
        console.error(error);
        setStoreError(error);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getStore();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader>Загрузка магазина</Loader>
      ) : (
        <>
          {!storeError ? (
            <>
              <Helmet>
                <title>{store.name} на Robomarket</title>
              </Helmet>
              <div className={styles.storeInfo}>
                <div className={styles.storeName}> {store.name} </div>
                <div className={styles.storeHeader}>
                  <div className={styles.description}> {store.description} </div>
                  {store.logo && (
                    <div className={styles.logoWrapper}>
                      <img className={styles.logo} src={store.logo.url} alt={store.name} />
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.additionalStoreInfo}>
                <div className={styles.infoWrapper}>
                  <div className={styles.infoTitle}>Информация</div>
                  <div className={styles.infoText}>
                    На Robo.Market c {store.created_at && FormattedDate(store.created_at)}
                  </div>
                </div>

                <div className={styles.infoWrapper}>
                  <div className={styles.infoTitle}>Контакты магазина</div>
                  {store.contacts.map((item) => (
                    <div key={item.value} className={styles.infoText}>
                      {item.type_name === 'email' ? (
                        <a href={`mailto:${item.value}`} type="email">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </div>
                  ))}
                </div>
                {/* <div className={styles.infoWrapper}> */}
                {/*  <div className={styles.infoTitle}>Доставка</div> */}
                {/*  <div className={styles.infoText}>Курьер, Самовывоз</div> */}
                {/* </div> */}
              </div>
              <div className="products">
                {/* <div className="productsFilter">filter</div> */}
                <Products query={query} storeId={storeIdData} />
              </div>
            </>
          ) : (
            <StoreNotFound message={storeError} />
          )}
        </>
      )}
    </div>
  );
};

export default Store;
