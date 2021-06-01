import React, { useState, useEffect } from 'react';
import { Image } from '@robokassa/robomarket-components';
import cn from 'classnames/bind';
import SVG from 'react-inlinesvg';
import adultMegaMarkImage from './images/adultMegaMarkImage.svg';
import styles from './styles.scss';

const ProductImages = ({ images, discount, blur }) => {
  const [checkedImage, setCheckedImage] = useState(null);

  useEffect(() => {
    setCheckedImage(images && images.length > 0 ? images[0].url : '');
  }, [images]);

  return (
    <div className={styles.productPicturesWrapper}>
      <Discount discount={discount} />
      {blur && <AdultProductMark />}
      {blur && <AdultProductMegaMark />}
      <div className={styles.smallImagesWrapper}>
        {images.map((image) => (
          <ProductImage
            key={image.url}
            url={image.url}
            discount={discount}
            onClick={(url) => setCheckedImage(url)}
            className={cn(styles.smallImage, blur && styles.blurImage)}
            small={true}
          />
        ))}

        {images.length === 0 && (
          <ProductImage
            url={checkedImage}
            key="smallNoImage"
            discount={discount}
            className={cn(styles.smallImage, blur && styles.blurImage)}
            small={true}
          />
        )}
      </div>
      <ProductImage url={checkedImage} className={cn(styles.bigImage, blur && styles.blurImage)} />
    </div>
  );
};

export default ProductImages;

const ProductImage = ({ url, onClick, className, small }) => {
  return (
    <div className={small ? styles.smallImageWrapper : styles.bigImageWrapper}>
      <Image
        key={url}
        alt=""
        className={className}
        src={url}
        onClick={(x) => onClick(x.target.src)}
        role="presentation"
        showLoader
        centered
      />
    </div>
  );
};

const Discount = ({ discount }) => {
  return (
    <>{discount !== '0' ? <div className={styles.productDiscount}>{`-${discount}%`}</div> : null}</>
  );
};

const AdultProductMark = () => {
  return <div className={styles.adultProductMark}>18+</div>;
};

const AdultProductMegaMark = () => {
  return (
    <div className={styles.adultProductMegaMark}>
      <SVG style={{ width: '20px' }} src={adultMegaMarkImage} />
      <div className={styles.adultProductMegaMarkText}>Товары для взрослых</div>
    </div>
  );
};
