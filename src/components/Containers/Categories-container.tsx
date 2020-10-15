import React from 'react';
import CategoriesTable from '../Tables/Categories/Categories-table';

import UseCategories from '../../hooks/useCategories';

const CategoriesContainer: React.FC = () => {
  let data = UseCategories();
  if (typeof data !== Array.constructor.name) data = []

  return <CategoriesTable data={data} />
}

export default CategoriesContainer;