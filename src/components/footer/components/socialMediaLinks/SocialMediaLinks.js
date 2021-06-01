import React from 'react';
import { MarketIcon } from '@robokassa/robomarket-components';
import styles from './styles.scss';

const SocialMediaLinks = () => {
  const baseColor = '#414141';
  return (
    <div className={styles.wrapper}>
      <a target="_blank" rel="noopener noreferrer" href="https://vk.com/robo.market">
        <MarketIcon type="vk" baseColor={baseColor} />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.facebook.com/RobomarketOfficial"
      >
        <MarketIcon type="facebook" baseColor={baseColor} />
      </a>
      <a target="_blank" rel="noopener noreferrer" href=" https://www.instagram.com/robo.market/">
        <MarketIcon type="instagram" baseColor={baseColor} />
      </a>
    </div>
  );
};

export default SocialMediaLinks;
