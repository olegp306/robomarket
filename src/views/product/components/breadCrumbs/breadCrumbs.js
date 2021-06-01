import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { callFetchApi } from '../../../../services/asyncApiFetch';
import styles from './styles.scss';

const BreadCrumb = ({ onSelect, name, id }) => {
  return (
    <span
      className={styles.breadCrumbsLink}
      role="button"
      onKeyDown={() => onSelect(id)}
      onClick={() => onSelect(id)}
      tabIndex={-1}
    >
      {name}
    </span>
  );
};

const BreadCrumbs = ({ product }) => {
  const history = useHistory();
  const [categoriesBranch, setCategoriesBranch] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);

  const onCategorySelect = (categoryId) => {
    const pushQuery = {
      pathname: '/catalog',
    };
    if (categoryId !== '') {
      pushQuery.search = `?category=${categoryId}`;
    }
    history.push(pushQuery);
  };

  const getCategories = (categoryId) => {
    const url = '/category/branch';
    const requestQuery = categoryId ? { category_id: categoryId } : {};
    callFetchApi({ url, query: requestQuery }, { method: 'get' }).then(({ data, error }) => {
      if (!error) {
        setCategoriesBranch(data.categories);
      }
    });
  };

  // eslint-disable-next-line consistent-return
  const makeCategoriesList = (categories) => {
    const branchCategory = {
      _id: categories._id,
      name: categories.name,
    };
    setCategoriesList((oldList) => [...oldList, branchCategory]);
    if (categories.children.length !== 0) {
      makeCategoriesList(categories.children[0]);
    }
  };

  useEffect(() => {
    product.category_id && getCategories(product.category_id);
  }, [product]);

  useEffect(() => {
    categoriesBranch && makeCategoriesList(categoriesBranch);
  }, [categoriesBranch]);

  return (
    <div className={styles.breadCrumbs}>
      {categoriesList.length === 0 ? (
        <BreadCrumb onSelect={onCategorySelect} name="Все товары" />
      ) : (
        categoriesList.map((item, index) => (
          <>
            <BreadCrumb key={item._id} onSelect={onCategorySelect} name={item.name} id={item._id} />
            {categoriesList.length !== index + 1 && <span> / </span>}
          </>
        ))
      )}
    </div>
  );
};

export default BreadCrumbs;
