import React from 'react';
import cn from 'classnames/bind';
import styles from './styles.scss';

const PopupWindow = ({
  onClose,
  children,
  isVisible = false,
  contentWrapperStyles,
  backgroundWrapperStyle,
}) => {
  return (
    isVisible && (
      <div className={styles.wrapper}>
        <div
          className={cn(styles.backgroundWrapper, backgroundWrapperStyle)}
          onClick={onClose}
          role="presentation"
        >
          <div
            className={cn(styles.contentWrapper, contentWrapperStyles)}
            onClick={(e) => e.stopPropagation()}
            role="presentation"
          >
            <button
              type="button"
              className={styles.popupClose}
              onClick={onClose}
              aria-label="Закрыть"
            />
            <section>{children}</section>
          </div>
        </div>
      </div>
    )
  );
};

export default PopupWindow;
