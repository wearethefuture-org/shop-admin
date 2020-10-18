import React from 'react';
import CategoriesTable from '../Tables/Categories/Categories-table';

import useCategories from '../../hooks/useCategories';
import FormDialog from '../Modals/Category-modal';
import useCategoriesModal from '../../hooks/useCategoriesModal';

const CategoriesContainer:React.FC = () => {
  const {data, dispatch} = useCategories();
  const categorisCreateModalData = useCategoriesModal();


  return (
    <>
      <CategoriesTable data={data} />
      <FormDialog
        dispatch={dispatch}
        categoriesLength={data.length}
        modalData={categorisCreateModalData}
      />
    </>
  );
}

export default CategoriesContainer;