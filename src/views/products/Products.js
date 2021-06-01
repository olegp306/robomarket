import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ProductsGrid as Grid, ProductsOrderPicker } from '@robokassa/robomarket-components';
import qs from 'qs';
import { inject, observer } from 'mobx-react';
import { NavigationPanel } from './components/navigationPanel/NavigationPanel';
import NoProducts from './components/noProducts';

import styles from './styles.scss';
import { callFetchApi } from '../../services/asyncApiFetch';
import FilterWrapper from './components/filterWrapper';
import LoaderWrapper from '../../components/loader/LoaderWrapper';
import { getCookie, setCookie } from '../../services/cookies';

const productsOrderPickerItems = [
  { label: 'По новизне', value: 'created_at:asc' },
  { label: 'Сначала дешевые', value: 'price:asc' },
  { label: 'Сначала дорогие', value: 'price:desc' },
];

const ProductsGrid = ({ storeId, geoStore, query }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProductsList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filterVisibility, setFilterVisibility] = useState(true);
  const [filterAdult, setFilterAdult] = useState(getCookie('AdultFilter') === 'true');
  const [blurProducts, setBlurProducts] = useState(getCookie('ConfirmedAdult') !== 'true');

  const getProducts = () => {
    let url;
    if (storeId) {
      url = `/product/store/${storeId}`;
    } else if (query.text) {
      url = '/product';
    } else {
      url = query.category_name || query.category ? '/product/category' : '/product/new';
    }
    const region = geoStore.currentLocationCode;
    const requestQuery = {
      items_per_page: 60,
      page_number: 1,
      show_restricted: !filterAdult,
      region,
      ...query,
    };
    if (region.startsWith('KZ')) {
      requestQuery.currency = 'KZT';
    }
    setIsLoading(true);
    callFetchApi({ url, query: requestQuery }, { method: 'get' }).then(({ data, error }) => {
      if (!error) {
        setProductsList(data.items);
        setTotalPages(data.total_pages);
      } else if (error.status === 404) {
        setProductsList([]);
      }
      setIsLoading(false);
    });
  };

  const onChangeFilters = (data) => {
    let newFilter;

    if (data.filterAdult !== undefined) {
      setFilterAdult(data.filterAdult);
      setCookie('AdultFilter', data.filterAdult);
      delete data.filterAdult;
    }

    if (data.clear) {
      newFilter = {};
    } else {
      newFilter = { ...query, ...data };
    }

    if ((newFilter.category_name && newFilter.category !== '') || newFilter.category === '') {
      delete newFilter.category_name;
    }

    newFilter = {
      ...newFilter,
      page_number: data.page_number ? data.page_number : 1,
    };

    if (storeId) {
      history.push(`/store/${storeId}?${qs.stringify(newFilter)}`);
    } else {
      history.push(`/catalog?${qs.stringify(newFilter)}`);
    }
  };

  const onProductClickHandler = (productId) => {
    history.push(`/product/${productId}`);
  };

  const onStoreClickHandler = (storeIdValue) => {
    history.push(`/store/${storeIdValue}`);
  };

  useEffect(() => {
    getProducts();
  }, [query, geoStore.currentLocation, filterAdult, storeId]);

  return (
    <div className={styles.viewWrapper}>
      <div className={styles.filterAndSortWrapper}>
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className={styles.filterSwitch} onClick={() => setFilterVisibility(!filterVisibility)}>
          <span className={styles.filterSwitchDesktop}>
            {filterVisibility ? 'Скрыть фильтры' : 'Показать фильтр'}
          </span>
          <span className={styles.filterSwitchMobile}>
            {filterVisibility ? 'Показать фильтр' : 'Скрыть фильтры'}
          </span>
        </div>
        <div className={styles.productsOrderPickerWrapper}>
          <ProductsOrderPicker
            onSelectHandler={(value) => onChangeFilters({ sort: value })}
            items={productsOrderPickerItems}
            selectedValue={query.sort || productsOrderPickerItems[0].value}
          />
        </div>
      </div>

      <div className={styles.productsAndFiltersWrapper}>
        <FilterWrapper
          query={query}
          filterAdult={filterAdult}
          onChangeFilters={onChangeFilters}
          filterVisibility={filterVisibility}
          onClose={() => setFilterVisibility(!filterVisibility)}
        />
        <LoaderWrapper isLoading={isLoading} title="Загрузка товаров">
          {products && products.length === 0 ? (
            <NoProducts />
          ) : (
            <Grid
              onProductClick={(productId) => onProductClickHandler(productId)}
              onStoreClick={(storeIdValue) => onStoreClickHandler(storeIdValue)}
              onAddToFavorite={(args) => console.log('onAddToFavorite', args)}
              items={products}
              favoriteItems={[]}
              blurAdult={blurProducts}
            />
          )}
        </LoaderWrapper>
      </div>
      <NavigationPanel
        total={totalPages}
        currentPage={parseInt(query?.['page_number'] || 1)}
        itemsPerPage={query?.['items_per_page'] || 3}
        onChange={onChangeFilters}
      />
    </div>
  );
};

ProductsGrid.propTypes = {
  geoStore: PropTypes.object.isRequired,
};

export default inject('geoStore')(observer(ProductsGrid));
