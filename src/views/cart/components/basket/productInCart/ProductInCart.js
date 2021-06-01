import React from 'react';
import { Image } from '@robokassa/robomarket-components';
import cn from 'classnames/bind';
import SVG from 'react-inlinesvg';
import styles from './styles.scss';
import DeliveryInfo from '../delivery/DeliveryInfo';
import { Currency } from '../../../../../components/formatter/currency';
import Counter from '../control/Counter';
import basket from './deleteFrombasket.svg';
import OldPrice from './oldPrice/OldPrice';

const getImage = (product) => (product.images.length > 0 ? product.images[0].url : '');

const ProductInCart = ({
  product,
  onRemoveFromBasket,
  onSetupDelivery,
  increaseCount,
  decreaseCount,
  isLast,
}) => {
  return (
    <div
      key={product._id}
      title={product.title}
      className={cn(styles.productWrapper, !isLast && styles.bottomBorder)}
    >
      <div className={styles.imageAndProductName}>
        <Image alt="" className={styles.image} src={getImage(product)} />
        <a
          href={`/product/${product._id}`}
          className={cn(styles.productName, styles.croppedProductName)}
        >
          {product.title}
        </a>
      </div>

      <div className={styles.deliveryWrapper}>
        {product.delivery.unable ? (
          <div className={styles.noDeliveryOptionsInCity}>
            К сожалению, этот товар не доставляется в Ваш регион.
            <br />
            Чтобы продолжить покупку, удалите товар из списка.
          </div>
        ) : (
          <DeliveryInfo item={product} onSetupDelivery={() => onSetupDelivery(product)} />
        )}
      </div>

      {!product.delivery.unable && (
        <div className={styles.priceAndCounterWrapper}>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>{Currency(product.price, product.currency)}</span>
            {product.initial_price !== product.price && (
              <OldPrice initial_price={product.initial_price} className={styles.oldPriceWrapper} />
            )}
          </div>
          <div className={styles.counterWrapper}>
            <Counter
              count={product.count}
              increaseCount={() => increaseCount(product._id)}
              decreaseCount={() => decreaseCount(product._id)}
            />
          </div>
        </div>
      )}

      <div className={styles.removeProductWrapper}>
        <SVG
          className={styles.removeProduct}
          src={basket}
          onClick={() => onRemoveFromBasket(product._id)}
        />
      </div>
    </div>
  );
};

export default ProductInCart;
