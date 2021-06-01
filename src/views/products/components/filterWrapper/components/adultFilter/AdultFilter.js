import React from 'react';

import { Switch } from '@robokassa/robomarket-components';

import styles from './styles.scss';

const AdultFilter = ({ onChange, checked }) => {
  return (
    <div className={styles.wrapper}>
      <Switch checked={checked} onChange={onChange} className={styles.checkbox}>
        <span className={styles.title}>Семейный фильтр</span>
      </Switch>
    </div>
  );
};

export default AdultFilter;
