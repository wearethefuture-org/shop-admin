import React from 'react';
import ProductsTable from '../Tables/Categories/Products-table';

import useProducts from '../../hooks/useProducts';
import products from '../../mock/products'


const ProductsContainer: React.FC = () => {
  let data = useProducts();
  data = products.concat()

  return <ProductsTable data={data} />
}

export default ProductsContainer;

