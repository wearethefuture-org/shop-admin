import React from 'react';
import { ITreeCategory } from '../../../../interfaces/ITreeCategory';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TreeCategoryEditModalForm from '../../../Forms/TreeCategories/TreeCategoryEditModalForm/TreeCategoryEditModalForm';
import TreeCategoryInfo from '../TreeCategoryInfo/TreeCategoryInfo';

enum Type {
  INFO = 'info',
  EDIT = 'edit',
}

interface ModalCategoryProps {
  type: keyof typeof Type;
  category: ITreeCategory;
  closeModal: () => void;
}

const MainTreeCategoryModal: React.FC<ModalCategoryProps> = ({ type, category, closeModal }) => {
  const handleClose = () => {
    closeModal();
  };

  const ModalContent = {
    info: <TreeCategoryInfo category={category} closeModal={handleClose} />,
    edit: <TreeCategoryEditModalForm category={category} closeModal={handleClose} />,
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="form-dialog-title">
        {String(type) === String(Type.INFO)
          ? 'Інформація про категорію'
          : String(type) === String(Type.EDIT)
          ? 'Редагування категорії'
          : null}
      </DialogTitle>
      <DialogContent dividers>{ModalContent[type]}</DialogContent>
    </Dialog>
  );
};

export default MainTreeCategoryModal;
