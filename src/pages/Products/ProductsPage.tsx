import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

import ProductsTable from '../../components/Tables/Products/ProductsTable/ProductsTable';
import AddBtn from '../../components/AddBtn/AddBtn';
import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import { RootState } from '../../store/store';
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
  files = 'Зображення продукта',
  createdAt = 'Створено',
  updatedAt = 'Оновлено',
}

const Products: React.FC = () => {
  const location = useLocation();

  const { list } = useProducts();

  const loading = useSelector((state: RootState) => state.products.loading);

  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>([
    cols.id,
    cols.mainImg,
    cols.name,
    cols.price,
    cols.description,
    cols.categoryName,
    cols.files,
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
        <div className={styles['table-wrapper']}>
          <ProductsTable list={list} activeColumns={activeColumns} />
        </div>
      </div>
    </>
  );
};

export default Products;
