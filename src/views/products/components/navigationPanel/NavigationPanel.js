import React from 'react';
import { StorePagination } from '@robokassa/robomarket-components';
import styles from './styles.scss';

export const NavigationPanel = ({ total, currentPage, itemsPerPage, onChange }) => {
  return (
    <div className={styles.navigationWrapper}>
      <div className={styles.paginationWrapper}>
        <StorePagination
          current={currentPage}
          total={total}
          onClickHandler={(param) => onChange({ page_number: param })}
        />
      </div>
    </div>
  );
};
