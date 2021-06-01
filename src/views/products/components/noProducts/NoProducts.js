import React from 'react';
import styles from './styles.scss';

const NoProducts = () => {
  return (
    <div className={styles.noProductsWrapper}>
      <div className={styles.title}>По вашему запросу ничего не найдено</div>
      <div className={styles.recomendationsWrapper}>
        <div className={styles.recomendationWrapper}>
          <div className={styles.smallTitle}>Рекомендации для покупателей</div>
          <div className={styles.recomendationText}>
            Убедитесь, что все слова написаны без ошибок
          </div>
          <div className={styles.recomendationText}>Используйте другие ключевые слова</div>
          <div className={styles.recomendationText}>Укажите другой город</div>
        </div>
        <div className={styles.recomendationWrapper}>
          <div className={styles.smallTitle}>Продаёте товар на Робо.Маркете?</div>

          <div className={styles.recomendationText}>Убедитесь, что предложение опубликовано</div>
          <div className={styles.recomendationText}>
            Убедитесь, что все слова написаны без ошибок
          </div>
          <div className={styles.recomendationText}>Если товара всё равно нет — напишите нам</div>
        </div>
      </div>
    </div>
  );
};

export default NoProducts;
