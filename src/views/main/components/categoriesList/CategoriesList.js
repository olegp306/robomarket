import React, { useState, useEffect } from 'react';
import styles from './styles.scss';

const CategoriesList = ({ children, categories, history }) => (
  <div className={styles.categoriesWrapper}>
    {children}
    <div className={styles.categories}>
      {categories.map((category) => (
        <div
          role="presentation"
          key={category._id}
          className={styles.category}
          onClick={() => history.push(`/catalog?category_name=${category.name}`)}
        >
          <div className={styles.title}>{category.name}</div>
          {/* <div className={styles.count}>{category.count}</div> */}
        </div>
      ))}
    </div>
  </div>
);

export default CategoriesList;
