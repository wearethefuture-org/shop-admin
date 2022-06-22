import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../../store/store';

import ProductsTable from '../../components/Tables/Products/ProductsTable';
import AddBtn from '../../components/AddBtn/AddBtn';
import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import styles from './ProductsPage.module.scss';
import queryString from 'query-string'
import { getProductsRequest } from '../../store/actions/products.actions';
import { IProductsData } from '../../interfaces/IProducts';
import Preloader from '../../components/Preloader/Preloader';

enum cols {
  id = 'ID',
  mainImg = 'Головне зображення',
  name = 'Назва',
  price = 'Ціна',
  description = 'Опис',
  categoryName = 'Категорія',
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
  cols.categoryName,
  cols.key,
  cols.files,
  cols.createdAt,
  cols.updatedAt,
]

if (localStorage.getItem('PRODUCTS_SETTINGS')) {
    initialActiveColums = localStorage.getItem('PRODUCTS_SETTINGS')!.split(',')
} 

const Products: React.FC = () => {
  const location = useLocation()
  const history = useHistory();
  const dispatch = useDispatch();
  
  const { count, searchValue, paginationPage, paginationLimit } = useSelector((state: RootState) => state.products);


  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false)
  const [activeColumns, setActiveColumns] = useState<string[]>(initialActiveColums)

  useEffect(() => {
    const parsed = queryString.parse(location.search) as QueryTypes

    let actualPage = paginationPage
    if(parsed.page) actualPage = Number(parsed.page)
    let actualLimit = paginationLimit
    if(parsed.limit) actualLimit = Number(parsed.limit)

    dispatch(getProductsRequest(actualPage, actualLimit));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    const querySearch = {} as QueryTypes
    if(!!paginationPage && paginationPage !== 1) querySearch.page = String(paginationPage)
    if(!!paginationLimit && paginationLimit !== 10) querySearch.limit = String(paginationLimit)

    history.push({
      pathname: '/products',
      search: queryString.stringify(querySearch),
      state: {
        update: true, 
      },
    })
  }, [history, paginationPage, paginationLimit])

  const { list, loading, isSearch }: Partial<IProductsData> = useSelector((state: RootState) => state.products);


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
            <Link
              to={{
                pathname: '/product/add',
                state: { from: `${location.pathname}` },
              }}
            >
              <AddBtn title="Додати" handleAdd={undefined} />
            </Link>
            <ColumnsBtn handleClick={() => setShowColumnsMenu(true)} />
          </div>
        </div>
        <div className={styles['table-wrapper']}>
          {loading ? <Preloader /> :
            list && (
              <ProductsTable
                list={list}
                activeColumns={activeColumns}
                isSearch={isSearch}
                searchValue={searchValue}
                count={count}
                paginationPage={paginationPage}
                paginationLimit={paginationLimit}
              />
            )
          }
        </div>
      </div>
  );
};

export default Products;

type QueryTypes = {
  page?: string, 
  limit?: string
}