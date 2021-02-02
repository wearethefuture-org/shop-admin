import React from 'react';

import ProductsTable from '../Tables/Products/Products-table';
import AddProduct from '../AddProduct/AddProduct';
import useProducts from '../../hooks/useProducts';


const ProductsContainer: React.FC = () => {
  const { data } = useProducts();

  return (
    <div>
      <ProductsTable {...data} />
      <AddProduct />
    </div>

  )
}

export default ProductsContainer;

