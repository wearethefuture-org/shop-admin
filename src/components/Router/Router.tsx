import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';

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
import { getToken, getUser } from '../../services/local-storage-controller';
import { userReinitialization } from '../../store/actions/user.action';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import AxiosInitiation from '../../api/axios-interceptors';
import { initRouting } from '../../store/actions/routing.actions';

const Init: React.FC = () => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    AxiosInitiation(history);
    dispatch(initRouting(history));
  });
  return <></>;
};

const Router: React.FC = () => {
  const [isOpenSidebar, setOpenSidebar] = React.useState(true);
  const toggleSidebar = () => setOpenSidebar(!isOpenSidebar);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (getToken() && getUser()) {
      dispatch(userReinitialization(getUser()));
    }
  });
  return (
    <BrowserRouter>
      {!getToken() || !getUser() ? <Redirect to="/home" /> : <></>}
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
              <Route path="/*" render={() => <Home />} />
            </Switch>
          </Content>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
