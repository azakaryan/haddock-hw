import { Routes, Route } from 'react-router-dom';
import { navigation } from './../constants';
import { Home, Products, Order } from './../pages';

function Router() {
  return (
    <Routes>
      <Route exact path={navigation.home} element={<Home />} />
      <Route exact path={navigation.products} element={<Products />} />
      <Route exact path={navigation.order} element={<Order />} />
    </Routes>
  ); 
}

export default Router;
