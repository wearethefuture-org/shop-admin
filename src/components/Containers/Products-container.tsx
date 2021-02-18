import React from 'react';

import useProducts from '../../hooks/useProducts';

const ProductsContainer: React.FC = () => {
  const { data } = useProducts();

  return <div></div>;
};

export default ProductsContainer;
