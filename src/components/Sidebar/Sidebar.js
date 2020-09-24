import React from 'react';
import style from './Sidebar.module.scss';
import {NavLink} from "react-router-dom";


const Sidebar = () => {
   return (
      <aside className={style.sidebar + ' col-md-2'}>
         <ul className={style.list}>
            <li><NavLink activeClassName={style.active} to="/categories" >Categories</NavLink></li>
            <li><NavLink activeClassName={style.active} to="/products" >Products</NavLink></li>
            <li><NavLink activeClassName={style.active} to="/statistic" >Statistic</NavLink></li>
            <li><NavLink activeClassName={style.active} to="/users" >Users</NavLink></li>
         </ul>
      </aside>
   )
}

export default Sidebar;