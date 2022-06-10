import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Sidebar from '../Sidebar/Sidebar';
import SnackBar from '../Common/SnackBar';
import Dashboard from '../../pages/Dashboard/Dashboard';
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
import TreeCategoryRouter from '../../pages/TreeCategories/TreeCategoryRouter';
import OrdersPage from '../../pages/Orders/OrdersPage';
import OrderRouter from '../../pages/Orders/OrderRouter';
import TreeCategories from '../../pages/TreeCategories/TreeCategories';
import Home from '../../pages/Home/Home';
import PrivateRoute from './PrivateRoute';
import { RootState } from '../../store/store';
import CommentsPage from '../../pages/Comments/CommentsPage';
import FeedbacksPage from '../../pages/Feedbacks/FeedbacksPage';
import Search from '../../pages/Search/Search';
import WithAxios from '../../api/withAxios';
import ResetPassword from '../../pages/ResetPassword/ResetPassward';
import Invoices from '../../pages/Invoices/Invoices';

const Router: React.FC = () => {
  const [isOpenSidebar, setOpenSidebar] = React.useState(true);
  const toggleSidebar = () => setOpenSidebar(!isOpenSidebar);

  const user = useSelector<RootState>((state) => state.user.user);

  return (
    <BrowserRouter>
      <WithAxios>
        <Route exact path="/">
          {user ? <Redirect to="/dashboard" /> : <Redirect to="/home" />}
        </Route>
        <Route exact path="/home">
          {user ? <Redirect to="/dashboard" /> : null}
        </Route>
        <div className={styles.container}>
          <Sidebar isOpen={isOpenSidebar} onSidebarToggle={toggleSidebar} />
          <SnackBar />

          <div className={isOpenSidebar ? styles.main : styles['main-expanded']}>
            <HeaderBar onSidebarToggle={toggleSidebar} isShrink={isOpenSidebar} />
            <Content>
              <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/tree-categories" exact={true} component={TreeCategories} />
                <PrivateRoute path="/products/" exact={true} component={Products} />
                <PrivateRoute path="/statistic" component={Statistic} />
                <PrivateRoute path="/invoices" component={Invoices} />
                <PrivateRoute path="/users" component={Users} />
                <PrivateRoute path="/slides" component={Slides} />
                <PrivateRoute path="/comments" component={CommentsPage} />
                <PrivateRoute path="/feedbacks" component={FeedbacksPage} />
                <PrivateRoute path="/settings" component={Settings} />
                <PrivateRoute path="/product/add" exact={true} component={AddProduct} />
                <PrivateRoute path="/orders" component={OrdersPage} />
                <PrivateRoute component={ViewProduct} path="/product/:id" />
                <PrivateRoute component={TreeCategoryRouter} path="/tree-category/:id" />
                <PrivateRoute component={Search} path="/search" />
                <PrivateRoute component={OrderRouter} path="/order/:id" />
                <Route path="/password" component={ResetPassword} />
                <Route path="/home" component={Home} />
              </Switch>
            </Content>
          </div>
        </div>
      </WithAxios>
    </BrowserRouter>
  );
};

export default Router;
