import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../../store/store';

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
  files = 'Зображення',
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
  cols.files,
  cols.createdAt,
  cols.updatedAt,
];

if (localStorage.getItem('PRODUCTS_SETTINGS')) {
  initialActiveColums = localStorage.getItem('PRODUCTS_SETTINGS')!.split(',');
}

const Products: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { count, paginationPage, paginationLimit, sort, sortDirect, filter, findPrice } = useSelector(
    (state: RootState) => state.products
  );

  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>(initialActiveColums);

  useEffect(() => {
    const parsed = queryString.parse(location.search) as QueryTypes;

    let actualPage = paginationPage;
    if (parsed.page) actualPage = Number(parsed.page);
    let actualLimit = paginationLimit;
    if (parsed.limit) actualLimit = Number(parsed.limit);
    let actualSort = sort;
    if (parsed.sort) actualSort = parsed.sort;
    let actualSortDirect = sortDirect;
    if (parsed.sortDirect) actualSortDirect = parsed.sortDirect;
    const actualFilter = {
      id: parsed.filterId ? parsed.filterId : filter.id,
      name: parsed.filterName ? parsed.filterName : filter.name,
      category: parsed.filterCategory ? parsed.filterCategory : filter.category,
      price: [
        parsed.filterPriceMin ? parsed.filterPriceMin : filter.price[0],
        parsed.filterPriceMax ? parsed.filterPriceMax : filter.price[1],
      ]
    };
  
    dispatch(getProductsRequest(actualPage, actualLimit, actualSort, actualSortDirect, actualFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const querySearch = {} as QueryTypes;
    if (!!paginationPage && paginationPage !== 1) querySearch.page = String(paginationPage);
    if (!!paginationLimit && paginationLimit !== 10) querySearch.limit = String(paginationLimit);
    if (!!sort && sort !== 'id') querySearch.sort = sort;
    if (!!sortDirect && sortDirect !== 'asc') querySearch.sortDirect = sortDirect;
    if (!!filter.id && filter.id !== null) querySearch.filterId = filter.id;
    if (!!filter.name && filter.name !== '') querySearch.filterName = filter.name;
    if (!!filter.category && filter.category !== '') querySearch.filterCategory = filter.category;
    if (!!filter.price && filter.price[0] !== findPrice[0] && filter.price[0] !== filter.price[1]) querySearch.filterPriceMin = filter.price[0];
    if (!!filter.price && filter.price[1] !== findPrice[1] && filter.price[0] !== filter.price[1]) querySearch.filterPriceMax = filter.price[1];

    history.push({
      pathname: '/products',
      search: queryString.stringify(querySearch),
      state: {
        update: true,
      },
    });
  }, [dispatch, history, paginationPage, paginationLimit, sort, sortDirect, filter, findPrice]);

  const { list, loading, isSearch }: Partial<IProductsData> = useSelector(
    (state: RootState) => state.products
  );

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
              count={count}
              paginationPage={paginationPage}
              paginationLimit={paginationLimit}
              sort={sort}
              sortDirect={sortDirect}
              filter={filter}
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
  filterPriceMin?: number[];
  filterPriceMax?: number[];
};
