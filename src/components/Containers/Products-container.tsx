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

// https://www.youtube.com/watch?v=AVCabfyzGcE
// https://spark-react.bootlab.io/layouts/theme-dark
// http://react-material.fusetheme.com/documentation/third-party-components/react-chartjs-2
// https://material-ui.com/ru/customization/breakpoints/