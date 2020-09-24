import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import Sidebar from "./components/Sidebar/Sidebar";
import {BrowserRouter, Route} from "react-router-dom";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import Statistic from "./components/Statistic/Statistic";
import Users from "./components/Users/Users";

export function App() {
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
   );
}