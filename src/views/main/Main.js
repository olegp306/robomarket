import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames/bind';
import Offers from './components/offers';
import Stores from './components/stores';

import styles from './styles.scss';
import ProductsSlider from './components/productsSlider';
import RoboServices from '../../components/roboServices';
import CategoriesSlider from './components/categoriesSlider';
import CategoriesList from './components/categoriesList';
import { callFetchApi } from '../../services/asyncApiFetch';

const offersStores = [
  {
    store_id: '1',
    name: 'Старинные фотоаппараты',
    imageUrl: 'https://storage.robo.market/action-110/actionimage-91?maxHeight=630',
  },
  {
    store_id: '2',
    name: 'Классический синий',
    imageUrl: 'https://storage.robo.market/action-111/actionimage-95?maxHeight=630',
  },
  {
    store_id: '3',
    name: 'Сыворотки для лица',
    imageUrl: 'https://storage.robo.market/action-109/actionimage-93?maxHeight=630',
  },
  {
    store_id: '4',
    name: 'Массажёры из камня',
    imageUrl: 'https://storage.robo.market/action-107/actionimage-94?maxHeight=630',
  },
  {
    store_id: '5',
    name: 'Интерьерные головы',
    imageUrl: 'https://storage.robo.market/action-108/actionimage-92?maxHeight=630',
  },
  {
    store_id: '6',
    name: 'Товары для плавания',
    imageUrl: 'https://storage.robo.market/action-112/actionimage-96?maxHeight=630',
  },
];

const categoriesWithLogo = [
  {
    category_id: 1,
    title: 'Обучение и вебинары',
    image: { url: '/assets/categories/maincontentimage-19.jpg' },
  },
  {
    category_id: 2,
    title: 'Детские товары',
    image: { url: '/assets/categories/maincontentimage-21.jpg' },
  },
  {
    category_id: 3,
    title: 'Дом и сад',
    image: { url: '/assets/categories/maincontentimage-20.jpg' },
  },
  {
    category_id: 4,
    title: 'Красота и здоровье',
    image: { url: '/assets/categories/maincontentimage-22.jpg' },
  },
  {
    category_id: 5,
    title: 'Подарки',
    image: { url: '/assets/categories/maincontentimage-24.jpg' },
  },
  {
    category_id: 6,
    title: 'Электроника',
    image: { url: '/assets/categories/maincontentimage-23.jpg' },
  },
];

const services = [
  {
    service_id: '1',
    imageUrl: 'https://storage.robo.market/maincontent-15/maincontentimage-16',
    description: 'Начни продажи прямо сейчас',
    url: 'https://start.robo.market',
  },
  {
    service_id: '2',
    imageUrl: 'https://storage.robo.market/maincontent-16/maincontentimage-15',
    description: 'Преврати свой Instagram в  магазин',
    url: 'https://insta.robo.market',
  },
  {
    service_id: '3',
    imageUrl: 'https://storage.robo.market/maincontent-17/maincontentimage-17',
    description: 'Продай вебинары и цифровые товары',
    url: 'https://start.robo.market',
  },
  {
    service_id: '4',
    imageUrl: 'https://storage.robo.market/maincontent-18/maincontentimage-18',
    description: 'Продай билеты на мероприятия',
    url: 'https://start.robo.market',
  },
];

const SectionView = ({ children, className }) => (
  <section className={cn(styles.section, className)}>{children}</section>
);

const filterCategories = ['instagram', 'Импортированные товары', 'Интим товары (18+)'];

const Main = () => {
  const history = useHistory();
  const [categories, setCategoriesList] = useState([]);

  const getCategories = () => {
    const url = '/category/nodes';

    callFetchApi({ url }, { method: 'get' }).then(({ data, error }) => {
      if (!error) {
        setCategoriesList(data.items.filter((item) => !filterCategories.includes(item.name)));
      } else {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={cn(styles.main, styles.smoothAppearance)}>
      <SectionView className={styles.mobile}>
        <Offers stores={offersStores} />
      </SectionView>
      <SectionView>
        <Stores advBlock>
          <div className={styles.title}>Новые магазины на Робо.Маркете</div>
        </Stores>
      </SectionView>
      <SectionView>
        <CategoriesSlider categories={categoriesWithLogo}>
          <div
            role="presentation"
            className={styles.categoriesTitle}
            onClick={() => history.push('/categories')}
          >
            Все категории
          </div>
        </CategoriesSlider>

        <CategoriesList categories={categories} history={history} />
      </SectionView>
      {categories.map((category) => (
        <SectionView key={category._id}>
          <ProductsSlider category={category.name}>
            <div
              role="presentation"
              className={styles.categoriesTitle}
              onClick={() => history.push(`/catalog?category_name=${category.name}`)}
            >
              {category.name}
            </div>
          </ProductsSlider>
        </SectionView>
      ))}
      {/* <Stores stores={recentlyViewedStores}> */}
      {/*  <div className={styles.categoryTitle}>Вы посещали эти магазины</div> */}
      {/* </Stores> */}
      {/* <ProductsSlider category="water"> */}
      {/*  <div className={styles.categoryTitle}>Недавно просмотренные товары</div> */}
      {/* </ProductsSlider> */}
      <SectionView>
        <div className={styles.title}>Сервисы Робо.Маркета</div>
        <RoboServices services={services} />
      </SectionView>
    </div>
  );
};

export default Main;
