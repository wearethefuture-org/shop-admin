import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { AppDispatch } from '../../../../store/store';
import { disableEnableCategoryRequest } from '../../../../store/actions/treeCategories.actions';
import { ITreeCategory } from '../../../../interfaces/ITreeCategory';
import DisableCategoryConfirm from '../../../../components/CustomConfirm/DisableCategoryConfirm';

interface ModalCategoryProps {
  switcherValue: boolean;
  handleClose: () => void;
  categoryInfo: ITreeCategory;
}

const DisableTreeCategoryModal: React.FC<ModalCategoryProps> = ({
  handleClose,
  switcherValue,
  categoryInfo,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const handleDisableCategory = () => {
    const data = {
      id: categoryInfo.id,
      disable: switcherValue,
    };
    dispatch(disableEnableCategoryRequest(data));
    handleClose();
  };

  function createWarning(category, disable): string {
    let verb;
    if (disable) {
      verb = 'вимкнено';
      if (category.children.length && !category.parent) {
        return 'категорія містить підкатегорії,  їх також буде ' + verb;
      }
      if (category.children.length && category.parent) {
        return 'категорія містить підкатегорії і батьківські категорії,  їх також буде ' + verb;
      }

      if (!category.children.length && category.parent) {
        return 'категорія містить батьківські категорії,  їх також буде ' + verb;
      }
    } else {
      verb = 'увімкнено';
      if (category.children.length && !category.parent) {
        return 'категорія містить підкатегорії,  їх також буде ' + verb;
      }
      if (category.children.length && category.parent) {
        return 'категорія містить підкатегорії і батьківські категорії,  їх також буде ' + verb;
      }

      if (!category.children.length && category.parent) {
        return 'категорія містить батьківські категорії,  їх також буде ' + verb;
      }
    }
    return '';
  }

  const warning = createWarning(categoryInfo, switcherValue);

  return (
    <>
      <DisableCategoryConfirm
        openDisableDialog={true}
        closeDisableDialog={handleClose}
        warning={createWarning(categoryInfo, switcherValue)}
        handleDisable={handleDisableCategory}
        dialogTitle={switcherValue ? 'Вимкнути категорію?' : 'Увімкнути категорію?'}
      />
    </>
  );
};

export default DisableTreeCategoryModal;
