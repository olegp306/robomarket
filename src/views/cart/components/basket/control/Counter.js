import React from 'react';
import cn from 'classnames/bind';
import s from './styles.scss';

const Counter = ({ count, increaseCount, decreaseCount }) => (
  <div className={s.counterWrapper}>
    <button type="button" className={cn(s.button, s.leftButton)} onClick={decreaseCount}>
      -
    </button>
    <input className={s.input} type="text" placeholder="1" value={count} />
    <button type="button" className={cn(s.button, s.rightButton)} onClick={increaseCount}>
      +
    </button>
    <span className={s.number}>шт.</span>
  </div>
);

export default Counter;
