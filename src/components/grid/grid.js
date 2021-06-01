import cn from 'classnames/bind';
import React from 'react';
import styles from './styles.scss';

export const Row = ({ className, onClick, children }) => (
  <div className={cn(styles.container__row, className)} onClick={onClick} role="presentation">
    {children}
  </div>
);

export const Col = ({ sm, md, lg, className, children }) => {
  const colClass = cn(
    styles[`container__col-sm-${sm}`],
    styles[`container__col-md-${md}`],
    styles[`container__col-lg-${lg}`],
  );
  return <div className={cn(colClass, className)}>{children}</div>;
};
