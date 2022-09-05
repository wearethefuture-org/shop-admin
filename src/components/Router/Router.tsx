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
import Login from '../../pages/Login/Login';
import PrivateRoute from './PrivateRoute';
import { RootState } from '../../store/store';
import CommentsPage from '../../pages/Comments/CommentsPage';
import FeedbacksPage from '../../pages/Feedbacks/FeedbacksPage';
import Search from '../../pages/Search/Search';
import WithAxios from '../../api/withAxios';
import ResetPassword from '../../pages/ResetPassword/ResetPassward';
import Invoices from '../../pages/Invoices/Invoices';
import Profile from '../../pages/Profile/Profile';

const Router: React.FC = () => {
  const [isOpenSidebar, setOpenSidebar] = React.useState(true);
  const toggleSidebar = () => setOpenSidebar(!isOpenSidebar);

  const user = useSelector<RootState>((state) => state.user.user);

  return (
    <BrowserRouter>
      <WithAxios>
        <Route exact path="/">
          {user ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/dashboard" /> : null}
        </Route>
        <div className={styles.container}>
          <Sidebar isOpen={isOpenSidebar} onSidebarToggle={toggleSidebar} />
          <SnackBar />

          <div className={isOpenSidebar ? styles.main : styles['main-expanded']}>
            <HeaderBar onSidebarToggle={toggleSidebar} isShrink={isOpenSidebar} />
            <Content>
              <Switch>
                <PrivateRoute path="/dashboard"         component={Dashboard} />
                <PrivateRoute path="/tree-categories"   component={TreeCategories} exact={true} />
                <PrivateRoute path="/products/"         component={Products} exact={true} />
                <PrivateRoute path="/statistic"         component={Statistic} />
                <PrivateRoute path="/invoices"          component={Invoices} />
                <PrivateRoute path="/users"             component={Users} />
                <PrivateRoute path="/slides"            component={Slides} />
                <PrivateRoute path="/comments"          component={CommentsPage} />
                <PrivateRoute path="/feedbacks"         component={FeedbacksPage} />
                <PrivateRoute path="/settings"          component={Settings} />
                <PrivateRoute path="/product/add"       component={AddProduct} exact={true} />
                <PrivateRoute path="/orders"            component={OrdersPage} />
                <PrivateRoute path="/product/:id"       component={ViewProduct} />
                <PrivateRoute path="/tree-category/:id" component={TreeCategoryRouter} />
                <PrivateRoute path="/search"            component={Search} />
                <PrivateRoute path="/order/:id"         component={OrderRouter} />
                <PrivateRoute path="/profile"           component={Profile} />
                <PrivateRoute path="/password"          component={ResetPassword} />
                <Route        path="/login"             component={Login} />
              </Switch>
            </Content>
          </div>
        </div>
      </WithAxios>
    </BrowserRouter>
  );
};

export default Router;
