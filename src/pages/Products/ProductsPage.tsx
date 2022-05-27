import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from './../../store/store';

import ProductsTable from '../../components/Tables/Products/ProductsTable';
import AddBtn from '../../components/AddBtn/AddBtn';
import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import useProducts from '../../hooks/useProducts';
import styles from './ProductsPage.module.scss';

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

const Products: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { searchValue } = Object(history.location.state);

  const {paginationPage, count} = useSelector((state: RootState) => state.products);
  
  const { list, loading, isSearch } = useProducts(paginationPage);

  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>([
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
  ]);

  const handleColumns = (column: string) =>
    activeColumns.includes(column)
      ? setActiveColumns(activeColumns.filter((col) => col !== column))
      : setActiveColumns([...activeColumns, column]);

  return (
    <>
      {loading && <LinearProgress />}

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
          {list && (
            <ProductsTable
              list={list}
              activeColumns={activeColumns}
              isSearch={isSearch}
              searchValue={searchValue}
              count={count}
              paginationPage={paginationPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
