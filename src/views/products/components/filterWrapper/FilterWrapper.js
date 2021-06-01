import React from 'react';

import CategoriesFilter from './components/categoriesFilter';
import PriceFilter from './components/priceFilter';
import AdultFilter from './components/adultFilter';
import PopupWindow from '../../../../components/popupWindow/PopupWindow';
import styles from './styles.scss';

const FilterWrapper = ({ query, filterAdult, onChangeFilters, filterVisibility, onClose }) => {
  return (
    <>
      {filterVisibility ? (
        <div className={styles.desktopWrapper}>
          <Filter query={query} filterAdult={filterAdult} onChangeFilters={onChangeFilters} />
        </div>
      ) : (
        <div className={styles.mobileWrapper}>
          <PopupWindow isVisible={!filterVisibility} onClose={onClose}>
            <Filter query={query} filterAdult={filterAdult} onChangeFilters={onChangeFilters} />
          </PopupWindow>
        </div>
      )}
    </>
  );
};

const Filter = ({ query, onChangeFilters, filterAdult }) => {
  return (
    <>
      <CategoriesFilter
        categoryId={query.category}
        onCategoryClick={(value) => onChangeFilters(value)}
      />
      <PriceFilter
        priceFromValue={query.price_from}
        priceToValue={query.price_to}
        onChangeFilter={(value) => onChangeFilters(value)}
      />
      <AdultFilter
        checked={filterAdult}
        onChange={(value) => onChangeFilters({ filterAdult: value })}
      />
    </>
  );
};

export default FilterWrapper;
