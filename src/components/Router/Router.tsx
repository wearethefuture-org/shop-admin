import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Categories from "../../pages/Categories/Categories";
import Products from "../../pages/Products/Products";
import Statistic from "../../pages/Statistic/Statistic";
import Users from "../../pages/Users/Users";

const Router = () => {
   return (
      <BrowserRouter>
      <div className="app-wrapper">
         <h1>ShopAdmin</h1>
         <div className="container-fluid">
           <div className="row">
              <Sidebar />
              <div className="content col">
                 <Route path="/categories" render={() => <Categories />} />
                 <Route path="/products" render={() => <Products />} />
                 <Route path="/statistic" render={() => <Statistic />} />
                 <Route path="/users" render={() => <Users />} />
              </div>
           </div>
         </div>
      </div>
      </BrowserRouter>
   )
}

export default Router;