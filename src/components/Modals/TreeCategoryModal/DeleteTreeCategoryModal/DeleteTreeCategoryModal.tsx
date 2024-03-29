import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from '../../../../store/store';
import { deleteTreeCategory } from '../../../../store/actions/treeCategories.actions';

import CustomConfirm from '../../../../components/CustomConfirm/CustomConfirm';

interface ICategoryInfo {
  id: number;
  name: string;
}

interface ModalCategoryProps {
  categoryInfo: ICategoryInfo;
  handleClose: () => void;
  lastCategory?: boolean;
}

const DeleteTreeCategoryModal: React.FC<ModalCategoryProps> = ({
  categoryInfo,
  handleClose,
  lastCategory,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const handleDeleteCategory = () => {
    dispatch(deleteTreeCategory(categoryInfo.id));

    if (lastCategory) {
      history.push('/tree-categories');
    }
  };

  return (
    <>
      <CustomConfirm
        openDeleteDialog={true}
        closeDeleteDialog={handleClose}
        name={`категорію ${categoryInfo.name}`}
        warning="Категорію та її підкатегорії буде остаточно видалено"
        handleDelete={handleDeleteCategory}
      />
    </>
  );
};

export default DeleteTreeCategoryModal;
