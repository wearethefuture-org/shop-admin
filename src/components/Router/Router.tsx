import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';
import SnackBar from '../Common/SnackBar';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Categories from '../../pages/Categories/Categories';
import Products from '../../pages/Products/ProductsPage';
import Statistic from '../../pages/Statistic/Statistic';
import Users from '../../pages/Users/Users';
import Slides from '../../pages/Slides/Slides';
import Settings from '../../pages/Settings/Settings';
import HeaderBar from '../HeaderBar/HeaderBar';
import Content from '../Content/Content';
import styles from './Router.module.scss';
import ViewProduct from '../../pages/Products/ProductRouter';
import AddProduct from '../Forms/Products/AddProduct/AddProduct';
import CategoryRouter from '../../pages/Categories/CategoryRouter';
import Home from '../../pages/Home/Home';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import AxiosInitiation from '../../api/axios-interceptors';
import { initRouting } from '../../store/actions/routing.actions';

const Init: React.FC = () => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const userState = useSelector((state: RootState) => {
    return state.user;
  });
  const existPath = [
    '/dashboard',
    '/categories',
    '/products',
    '/statistic',
    '/users',
    '/slides',
    '/settings',
    '/settings',
    '/product/add',
    '/product/\\d\\*',
    '/category/\\d\\*',
  ];
  const location = useLocation();
  const [user, setUser] = useState(userState);

  useEffect(() => {
    const initState = () => {
      AxiosInitiation(history);
      dispatch(initRouting(history));
      setUser(userState);
    };
    initState();
  });

  return (
    <Redirect
      to={
        !user.isLoggedIn
          ? '/home'
          : user.isLoggedIn && user.isLoggedNow
          ? '/dashboard'
          : location.pathname === '/home' ||
            existPath.findIndex((path) => path === location.pathname) < 0
          ? '/dashboard'
          : location.pathname
      }
    />
  );
};

const Router: React.FC = () => {
  const [isOpenSidebar, setOpenSidebar] = React.useState(true);
  const toggleSidebar = () => setOpenSidebar(!isOpenSidebar);
  return (
    <BrowserRouter>
      <Init />
      <div className={styles.container}>
        <Sidebar isOpen={isOpenSidebar} onSidebarToggle={toggleSidebar} />
        <SnackBar />
        <div className={isOpenSidebar ? styles.main : styles['main-expanded']}>
          <HeaderBar onSidebarToggle={toggleSidebar} isShrink={isOpenSidebar} />
          <Content>
            <Switch>
              <Route path="/home" render={() => <Home />} />
              <Route path="/dashboard" render={() => <Dashboard />} />
              <Route path="/categories" render={() => <Categories />} />
              <Route path="/products/" exact={true} component={Products} />
              <Route path="/statistic" render={() => <Statistic />} />
              <Route path="/users" render={() => <Users />} />
              <Route path="/slides" render={() => <Slides />} />
              <Route path="/settings" render={() => <Settings />} />
              <Route
                path="/product/add"
                exact={true}
                render={({ match }) => <AddProduct {...match.params} />}
              />
              <Route
                path="/product/:id"
                render={({ match }) => <ViewProduct {...match.params} />}
              />
              <Route
                path="/category/:id"
                render={({ match }) => <CategoryRouter {...match.params} />}
              />
            </Switch>
          </Content>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
