import React from 'react';
import ProductsTable from '../Tables/Categories/Products-table';

import UseProducts from '../../hooks/UseProducts';
import products from '../../mock/products'

const ProductsContainer: React.FC = () => {
  let data = UseProducts();
  data = products.concat()

  return <ProductsTable data={data} />
}

export default ProductsContainer;