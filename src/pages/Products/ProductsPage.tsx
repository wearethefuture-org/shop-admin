import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import ProductsTable from './ProductsTable/ProductsTable';
import AddBtn from '../../components/AddBtn/AddBtn';
import useProducts from '../../hooks/useProducts';
import styles from './ProductsPage.module.scss';

const Products: React.FC = () => {
  const location = useLocation();
  const { data: productsData } = useProducts();

  return (
    <div className={styles.container}>
      <div className={`${styles['add-btn-wrapper']}`}>
        <Link
          to={{
            pathname: '/product/add',
            state: { from: `${location.pathname}` },
          }}
        >
          <AddBtn handleAdd={null} />
        </Link>
      </div>
      <div className={`${styles['table-wrapper']}`}>
        <ProductsTable {...productsData} />
      </div>
    </div>
  );
};

export default Products;
