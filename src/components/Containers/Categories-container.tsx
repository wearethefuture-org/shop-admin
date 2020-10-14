import React from 'react';
import CategoriesTable from '../Tables/Categories/Categories-table';

import useCategories from '../../hooks/useCategories';
import FormDialog from '../Modals/Category-modal';
import useModal from '../../hooks/useModal';

const CategoriesContainer:React.FC = () => {
  const {data, dispatch} = useCategories();
  const {isModalOpened, toggleModalHandler} = useModal();

  return (
    <>
      <CategoriesTable data={data} />
      <FormDialog
        isModalOpened={isModalOpened}
        toggleModalHandler={toggleModalHandler}
        dispatch={dispatch}
        categoriesLength={data.length}
      />
    </>
  );
}

export default CategoriesContainer;