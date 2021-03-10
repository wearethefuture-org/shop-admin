import React from 'react';
import CategoriesTable from '../Tables/Categories/Categories-table';

import useCategories from '../../hooks/useCategories';
import FormDialog from '../Modals/Category-modal';
import useCategoriesModal from '../../hooks/useCategoriesModal';

const CategoriesContainer: React.FC = () => {
  const { data, dispatch } = useCategories();
  const categoriesCreateModalData = useCategoriesModal();

  return (
    <div style={{ padding: '1rem' }}>
      <FormDialog
        dispatch={dispatch}
        categoriesLength={data?.length}
        modalData={categoriesCreateModalData}
      />
      <CategoriesTable data={data} />
    </div>
  );
};

export default CategoriesContainer;
