import React from 'react';
import cn from 'classnames';
import s from './styles.scss';

const Notificator = ({ show, delay, children }) => {
  return <div className={cn(s.notificator, s.visible)}>{children}</div>;
};

export default Notificator;
