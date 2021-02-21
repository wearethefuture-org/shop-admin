import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ProductsTable from './ProductsTable/ProductsTable';

import AddBtn from '../../components/AddBtn/AddBtn';
import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import useProducts from '../../hooks/useProducts';
import styles from './ProductsPage.module.scss';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';

const cols = {
  id: 'ID',
  mainImg: 'Головне зображення',
  name: 'Назва',
  price: 'Ціна',
  description: 'Опис',
  categoryName: 'Категорія',
  key: 'URL ключ',
  files: 'Зображення продукта',
  createdAt: 'Створено',
  updatedAt: 'Оновлено',
};

const Products: React.FC = () => {
  const location = useLocation();
  const { data: productsData } = useProducts();

  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [activeColumns, setActiveColumns] = useState([
    cols.id,
    cols.mainImg,
    cols.name,
    cols.price,
    cols.description,
    cols.categoryName,
    cols.files,
  ]);

  const handleColumns = (column) =>
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
        <Link
          to={{
            pathname: '/product/add',
            state: { from: `${location.pathname}` },
          }}
        >
          <AddBtn handleAdd={null} />
        </Link>
        <ColumnsBtn handleClick={() => setShowColumnsMenu(true)} />
      </div>
      <div className={`${styles['table-wrapper']}`}>
        <ProductsTable list={productsData.list} activeColumns={activeColumns} />
      </div>
    </div>
  );
};

export default Products;
