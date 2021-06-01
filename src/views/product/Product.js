import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MarketButton } from '@robokassa/robomarket-components';
import { inject, observer } from 'mobx-react';
import { Helmet } from 'react-helmet';
import cn from 'classnames/bind';
import Loader from '../../components/loader/Loader';
import styles from './styles.scss';
import DeliverySelector from './components/deliverySelector';
import Seller from './components/sellerContacts';
import ProductImages from './components/productImages';
import { callFetchApi } from '../../services/asyncApiFetch';
import { Currency } from '../../components/formatter/currency';
import BreadCrumbs from './components/breadCrumbs';
import AgeConfirmationPopup from '../../components/ageConfirmationPopup';
import { getCookie, setCookie } from '../../services/cookies';

const ProductNotFound = ({ message }) => {
  return (
    <div className={styles.wrapper}>
      <h2>{message}</h2>
      <h3>Обратитесь по поддержку</h3>
    </div>
  );
};

const Product = ({ cartStore, geoStore, productId, offerId }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProductData] = useState({ images: [], available_deliveries: [] });
  const [deliveryTypeId, setDeliveryType] = useState();
  const [deliveryZoneId, setDeliveryZone] = useState();
  const [errorAddCart, setErrorAddCart] = useState();
  const [confirmedAdult, setConfirmedAdult] = useState(getCookie('ConfirmedAdult') === 'true');
  const [productError, setProductError] = useState();

  const getProduct = () => {
    setIsLoading(true);
    const url = offerId !== undefined ? `/product/by_offer_id/${offerId}` : `/product/${productId}`;
    callFetchApi({ url }, { method: 'get' }).then(({ data, error }) => {
      if (!error) {
        setProductData(data.item);
      } else if (error.status === 404) {
        setProductData({ images: [], available_deliveries: [] });
        setProductError('Товар не найден или магазин неактивен!');
      }
      setIsLoading(false);
    });
  };

  const getTypeDeliveryName = (typeId) => {
    const deliveryTypeData = product.available_deliveries.filter((item) => item._id === typeId);
    return deliveryTypeData ? deliveryTypeData[0] : '';
  };

  const getTypeDeliveryZoneName = (typeDelivery, zoneId) => {
    const deliveryTypeData = typeDelivery.zones.filter((item) => item._id === zoneId);
    return deliveryTypeData ? deliveryTypeData[0] : null;
  };

  const calculateCostDelivery = (typeDelivery, zoneId) => {
    if (typeDelivery && !zoneId) {
      return typeDelivery.cost;
    } else if (typeDelivery && zoneId) {
      const filterZone = getTypeDeliveryZoneName(typeDelivery, zoneId);
      return filterZone ? filterZone.cost : 0;
    }
    // TODO: think about this case
    return 0;
  };

  const availableDeliveriesByGeo = product.available_deliveries.filter(
    (item) => !item.region || [geoStore.currentLocationCode, 'RU'].includes(item.region),
  );

  const redirectToCatalog = () => {
    history.push('/catalog');
  };

  const confirmAdult = () => {
    setCookie('ConfirmedAdult', true);
    setConfirmedAdult(true);
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  const addToCart = () => {
    if (!deliveryTypeId) {
      setErrorAddCart('Выберите тип доставки');
      return;
    }
    const deliveryTypeData = getTypeDeliveryName(deliveryTypeId);
    product.delivery = {
      type_id: deliveryTypeId,
      type: deliveryTypeData.type_name,
      region: deliveryTypeData.region,
      cost: calculateCostDelivery(deliveryTypeData, deliveryZoneId),
      description: deliveryTypeData.description,
    };
    if (deliveryZoneId) {
      product.delivery.zone_id = deliveryZoneId;
      product.delivery.zone = getTypeDeliveryZoneName(deliveryTypeData, deliveryZoneId).zone;
      product.delivery.city = getTypeDeliveryZoneName(deliveryTypeData, deliveryZoneId).city;
      product.delivery.zoneDescription = getTypeDeliveryZoneName(
        deliveryTypeData,
        deliveryZoneId,
      ).description;
    } else {
      product.delivery.city = deliveryTypeData.city;
    }
    cartStore.addProductToCart(product);
  };

  const isProductInCart = cartStore.productListIds.find(
    (item) => item === productId || item === product._id || item === product.number,
  );

  if (isLoading) {
    return <Loader className={styles.smoothAppearance}>Загрузка товара</Loader>;
  }

  if (productError) {
    return <ProductNotFound message={productError} />;
  }

  return product.adult && !confirmedAdult ? (
    <AgeConfirmationPopup
      onClose={redirectToCatalog}
      onDeny={redirectToCatalog}
      onSubmit={confirmAdult}
    />
  ) : (
    <div className={cn(styles.productWrapper, styles.smoothAppearance)}>
      <Helmet>
        <title>{`${product.title} - купить на Robomarket`}</title>
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:image"
          content={product.images.length > 0 ? product.images[0].url : ''}
        />
      </Helmet>
      <BreadCrumbs product={product} />
      <div className={styles.productInfo}>
        <div className={styles.leftWrapper}>
          <ProductImages
            images={product.images}
            discount={product.discount_percent}
            blur={product.adult && !confirmedAdult}
          />
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        <div className={styles.rightWrapper}>
          <div className={styles.productArticleTitle}>{product.title}</div>
          <div className={styles.productPrice}>{Currency(product.price, product.currency)}</div>
          {product.discount_percent !== '0' && (
            <OldPrice initialPrice={product.initial_price} currency={product.currency} />
          )}
          <div className={cn(styles.deliveryWrapper, isProductInCart && styles.disable)}>
            {availableDeliveriesByGeo.length > 0 ? (
              <DeliverySelector
                currentLocationCode={geoStore.currentLocationCode}
                currentLocation={geoStore.currentLocation}
                availableDelivery={product.available_deliveries || []}
                currency={product.currency}
                onChangeType={setDeliveryType}
                onChangeZone={setDeliveryZone}
              />
            ) : (
              <h3 className={styles.errorDelivery}>
                Извините, мы не можем доставить данный товар в регион: {geoStore.currentLocation}!
              </h3>
            )}
          </div>

          <div className={styles.actionsWrapper}>
            {/* <div style={{ visibility: 'hidden' }}> */}
            {/*  <MarketButton onClick={() => console.log('onClickByuNow')}> */}
            {/*    Купить сейчас */}
            {/*  </MarketButton> */}
            {/* </div> */}
            {errorAddCart && <span className={styles.error}>{errorAddCart}</span>}
            {availableDeliveriesByGeo.length > 0 && product.amount > 0 ? (
              <MarketButton
                type={isProductInCart ? 'line' : 'primary'}
                onClick={isProductInCart ? () => history.push('/cart') : addToCart}
                className={cn(styles.buttonBuy, isProductInCart && styles.goToCartButton)}
              >
                <div className={styles.buttonLabel}>
                  {isProductInCart ? 'Перейти в корзину' : 'В корзину'}
                </div>
                <div className={styles.smallText}>{isProductInCart && 'товар в корзине'}</div>
              </MarketButton>
            ) : (
              <MarketButton
                type="cancel"
                onClick={addToCart}
                disabled={true}
                className={styles.buttonBuy}
              >
                <div className={styles.buttonLabel}>
                  {product.amount === 0 ? 'Нет в наличии' : 'Недоступно'}
                </div>
              </MarketButton>
            )}
          </div>
          <Seller data={product} />
        </div>
      </div>
    </div>
  );
};

export default inject('cartStore', 'geoStore')(observer(Product));

const OldPrice = ({ initialPrice, currency }) => {
  return (
    <div className={styles.productOldPriceWrapper}>
      <div className={styles.productOldPrice}>{Currency(initialPrice, currency)}</div>
    </div>
  );
};
