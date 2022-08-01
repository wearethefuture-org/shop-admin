import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

import ProductsTable from '../../components/Tables/Products/ProductsTable';
import AddBtn from '../../components/AddBtn/AddBtn';
import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import styles from './ProductsPage.module.scss';
import queryString from 'query-string';
import { getProductsRequest } from '../../store/actions/products.actions';
import { IProductsData } from '../../interfaces/IProducts';
import Preloader from '../../components/Preloader/Preloader';
import ProductFilter from '../../components/Tables/Products/Filter/ProductFilter';

export enum cols {
  id = 'ID',
  mainImg = 'Головне зображення',
  name = 'Назва',
  price = 'Ціна',
  description = 'Опис',
  category = 'Категорія',
  key = 'URL ключ',
  shopKey = 'Магазин',
  createdAt = 'Створено',
  updatedAt = 'Оновлено',
  notcall = 'Не передзвонювати',
}

let initialActiveColums: string[] = [
  cols.id,
  cols.mainImg,
  cols.name,
  cols.price,
  cols.description,
  cols.category,
  cols.key,
  cols.shopKey,
  cols.createdAt,
  cols.updatedAt,
];

if (localStorage.getItem('PRODUCTS_SETTINGS')) {
  initialActiveColums = localStorage.getItem('PRODUCTS_SETTINGS')!.split(',');
}

const Products: React.FC = () => {
  const location = useLocation();

  const { count, paginationPage, paginationLimit, sort, sortDirect, filter, findPrice } = useSelector(
    (state: RootState) => state.products
  );

  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>(initialActiveColums);

  let searchValue = '';
  if (sessionStorage.getItem('searchValue')) {
    searchValue = String(sessionStorage.getItem('searchValue'));
  }

  let currentPage = 1;
  if (sessionStorage.getItem('productsCurrentPage')) {
    currentPage = Number(sessionStorage.getItem('productsCurrentPage'));
  }

  localStorage.setItem('PRODUCTS_SETTINGS', activeColumns.toString());

  const handleColumns = (column: string) =>
    activeColumns.includes(column)
      ? setActiveColumns(activeColumns.filter((col) => col !== column))
      : setActiveColumns([...activeColumns, column]);

  return (
    <div className={styles.container}>
      {showColumnsMenu && (
        <ColumnsMenu
          allColumns={cols}
          activeColumns={activeColumns}
          showColumnsMenu={showColumnsMenu}
          setShowColumnsMenu={setShowColumnsMenu}
          handleColumns={handleColumns}
        />
      )}
      <div className={styles['header-btn-wrapper']}>
        <div className={styles.headerButtons}>
          <ProductFilter />
          <Link
            to={{
              pathname: '/product/add',
              state: { from: `${location.pathname}` },
            }}
          >
            <AddBtn title='Додати' handleAdd={undefined} />
          </Link>
          <ColumnsBtn handleClick={() => setShowColumnsMenu(true)} />
        </div>
      </div>
      <div className={styles['table-wrapper']}>
        {loading ? (
          <Preloader />
        ) : (
          list && (
            <ProductsTable
              list={list}
              activeColumns={activeColumns}
              isSearch={isSearch}
              searchValue={searchValue}
              currentPage={currentPage}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Products;

type QueryTypes = {
  page?: string;
  limit?: string;
  sort?: string;
  sortDirect?: string;
  filterId?: string;
  filterName?: string;
  filterCategory?: string;
  filterShop?: string;
  filterPriceMin?: number[];
  filterPriceMax?: number[];
};
