import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import styles from './styles.scss';
import PopupWindow from '../../popupWindow/PopupWindow';

const RegionSearchItem = ({ data, changeRegion }) => (
  <div
    key={data.value}
    className={styles.regionSearchItem}
    onClick={() => changeRegion(data.region)}
    role="presentation"
  >
    {data.region}
  </div>
);

const RegionPopup = ({ geoStore, closeHandler, changeRegion }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState(geoStore.geoList);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const getSuggestions = (val) => {
    const inputValue = val.trim().toLowerCase();
    return geoStore.geoList.filter(
      (item) => item.region.toLowerCase().slice(0, inputValue.length) === inputValue,
    );
  };

  const inputProps = { placeholder: 'Поиск по регионам', value, onChange };

  return (
    <PopupWindow isVisible={true} onClose={closeHandler}>
      <span className={styles.header}>Выберите регион</span>
      <div className={styles.searchInput}>
        <Autosuggest
          className={styles.regionSearch}
          suggestions={suggestions}
          onSuggestionsFetchRequested={() => setSuggestions(getSuggestions(value))}
          onSuggestionsClearRequested={() => setSuggestions([])}
          getSuggestionValue={(suggestion) => suggestion.region}
          renderSuggestion={(suggestion) => (
            <RegionSearchItem
              data={suggestion}
              closeHandler={closeHandler}
              changeRegion={changeRegion}
            />
          )}
          inputProps={inputProps}
        />
      </div>
      <div className={styles.suggestGeo}>
        <section>
          <span className={styles.geoHeader}>Россия</span>
          {geoStore.popularGeoList.map((item) => (
            <div key={item.code}>
              <div
                className={styles.popularItem}
                onClick={() => changeRegion(item.region)}
                role="presentation"
              >
                {item.region}
              </div>
            </div>
          ))}
        </section>
      </div>
    </PopupWindow>
  );
};

export default RegionPopup;
