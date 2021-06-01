import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Provider } from 'mobx-react';
import styles from './styles.scss';
import stylesV2 from './components/v2/styles.scss';
import userStore from './stores/userStore';
import Products from './views/products';
import Main from './views/main';
import Product from './views/product';
import Header from './components/header';
import Footer from './components/footer';
import CatalogMenu from './components/catalogMenu';
import Cart from './views/cart/Cart';
import AddToCart from './views/cart/components/addToCart/AddToCart';

import cartStore from './stores/cartStore';
import geoStore from './stores/geoStore';
import Store from './views/store';
import ImportProducts from './views/importProduct';
import InfoForStores from './views/info/infoForStores/InfoForStores';
import WhatIsRobomarket from './views/info/whatIsRobomarket/WhatIsRobomarket';
import PageNotFound from './views/info/pageNotFound';
import ForBuyers from './views/info/whatIsRobomarket/forBuyers';
import Categories from './views/categories';
import Order from './views/order';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import withLandingLayout from './components/v2/LandingLayout';

const stores = { userStore, cartStore, geoStore };

const ProductsGridPage = () => {
  const { search } = useLocation();
  const params = Object.fromEntries(new URLSearchParams(search));
  return <Products query={{ ...params }} />;
};

const MainPage = () => {
  const domain = window.location.hostname;
  const regex = new RegExp(/^([\w-]+)\.[\w-]+\.\w+$/);
  const matched = domain.match(regex);
  if (matched && matched[1] !== 'www') {
    const domainName = domain.match(regex)[1];
    return <Store domain={domainName} />;
  }
  const { search } = useLocation();
  const params = Object.fromEntries(new URLSearchParams(search));
  return <Main query={{ ...params }} />;
};

const DetailedProductPage = () => {
  const { productId, offerId } = useParams();
  return <Product productId={productId} offerId={offerId} />;
};

const StorePage = () => {
  const { storeId } = useParams();
  const { search } = useLocation();
  const params = Object.fromEntries(new URLSearchParams(search));
  return <Store storeId={storeId} query={params} />;
};

const CartPage = () => {
  const { search } = useLocation();
  const params = Object.fromEntries(new URLSearchParams(search.toLowerCase()));

  if (params.invid && params.outsum && params.signaturevalue) {
    return <Redirect to={{ pathname: '/order', search }} />;
  }

  return <Cart {...params} />;
};

const ImportProductsPage = () => {
  const { search } = useLocation();
  const params = Object.fromEntries(new URLSearchParams(search.toLowerCase()));
  return <ImportProducts instagramUri={params.instagramuri} />;
};

const AddProductToCartPage = () => {
  const { search } = useLocation();
  const params = Object.fromEntries(new URLSearchParams(search.toLowerCase()));
  return <AddToCart offerId={params.offerid} number={params.number} />;
};

const AddProductToCheckout = () => {
  const { search } = useLocation();
  const params = Object.fromEntries(new URLSearchParams(search.toLowerCase()));
  return <AddToCart offerId={params.offerid} number={params.number} goToCheckout />;
};

const OrderSuccessPage = () => {
  const { search } = useLocation();
  return <Order search={search} />;
};

const withBaseLayout = (Component) => (props) => {
  const { search } = useLocation();
  const params = Object.fromEntries(new URLSearchParams(search));

  return (
    <div className={styles.wrapper}>
      <Header searchValue={params.text} />
      <CatalogMenu /> <Component {...props} />
      <Footer />
    </div>
  );
};


export const App = () => (
  <Provider {...stores}>
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={withBaseLayout(MainPage)} />
        <Route exact path="/catalog" component={withBaseLayout(ProductsGridPage)} />
        <Route exact path="/categories" component={withBaseLayout(Categories)} />
        <Route exact path="/product/:productId" component={withBaseLayout(DetailedProductPage)} />

        <Route
          exact
          path="/v2/product/:productId"
          component={withLandingLayout(DetailedProductPage)}
        />

        <Route exact path="/offer/:offerId" component={withBaseLayout(DetailedProductPage)} />
        <Route exact path="/store/:storeId" component={withBaseLayout(StorePage)} />
        <Route exact path="/cart" component={withBaseLayout(CartPage)} />
        <Route exact path="/cart/insert" component={withBaseLayout(AddProductToCartPage)} />
        <Route exact path="/cart/insertexternal" component={withBaseLayout(AddProductToCheckout)} />
        <Route exact path="/instagram" component={ImportProductsPage} />
        <Route exact path="/order" component={withBaseLayout(OrderSuccessPage)} />

        <Route exact path="/info/forstores" component={withBaseLayout(InfoForStores)} />
        <Route exact path="/info/whatisrobomarket" component={withBaseLayout(WhatIsRobomarket)} />
        <Route exact path="/info/forbuyers" component={withBaseLayout(ForBuyers)} />

        <Route exact path="/notfound" component={withBaseLayout(PageNotFound)} />
        <Route render={() => <Redirect to={{ pathname: '/notfound' }} />} />
      </Switch>
    </Router>
  </Provider>
);
