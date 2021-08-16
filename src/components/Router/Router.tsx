import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
import OrdersPage from '../../pages/Orders/OrdersPage';
import OrderRouter from '../../pages/Orders/OrderRouter';
import MainCategories from '../../pages/MainCategories/MainCategory';
import MainCategoryRouter from '../../pages/MainCategories/MainCategoryRouter';
import Home from '../../pages/Home/Home';
import PrivateRoute from './PrivateRoute';
import { RootState } from '../../store/store';
import CommentsPage from '../../pages/Comments/CommentsPage';
import FeedbacksPage from '../../pages/Feedbacks/FeedbacksPage';

const Router: React.FC = () => {
  const [isOpenSidebar, setOpenSidebar] = React.useState(true);
  const toggleSidebar = () => setOpenSidebar(!isOpenSidebar);

  const user = useSelector<RootState>((state) => state.user.user);
  const token = localStorage.getItem('TOKEN');

  return (
    <BrowserRouter>
      <Route exact path="/">
        {user ? <Redirect to="/dashboard"/> : <Redirect to="/home"/>}
      </Route>
      <div className={styles.container}>
        <Sidebar isOpen={isOpenSidebar} onSidebarToggle={toggleSidebar} />
        <SnackBar />

        <div className={isOpenSidebar ? styles.main : styles['main-expanded']}>
          <HeaderBar onSidebarToggle={toggleSidebar} isShrink={isOpenSidebar}/>
          <Content>
            <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/sub-categories" component={Categories} />
              <PrivateRoute path="/main-categories" component={MainCategories} />
              <PrivateRoute path="/products/" exact={true} component={Products} />
              <PrivateRoute path="/statistic" component={Statistic} />
              <PrivateRoute path="/users" component={Users} />
              <PrivateRoute path="/slides" component={Slides} />
              <PrivateRoute path="/comments" component={CommentsPage} />
              <PrivateRoute path="/feedbacks" component={FeedbacksPage} />
              <PrivateRoute path="/settings" component={Settings} />
              <PrivateRoute path="/product/add" exact={true} component={AddProduct} />
              <PrivateRoute path="/orders" component={OrdersPage}/>
              <PrivateRoute component={ViewProduct} path="/product/:id" />
              <PrivateRoute component={CategoryRouter} path="/sub-category/:id" />
              <PrivateRoute component={MainCategoryRouter} path="/main-category/:id" />
              <PrivateRoute component={OrderRouter} path="/order/:id"/>
              {!user && !token ? (
                <Route path="/home" component={Home}/>
              ) : (
                <Redirect to="/dashboard"/>
              )}
            </Switch>
          </Content>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
