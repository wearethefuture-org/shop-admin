import React from 'react';
import CategoriesTable from '../Tables/Categories/Categories-table';

import UseCategories from '../../hooks/useCategories';

const CategoriesContainer:React.FC = () => {
  const data = UseCategories();

  return <CategoriesTable data={data} />
}

export default CategoriesContainer;