import React from 'react';
import { Dispatch } from 'redux';
import { IMainCategoriesModal } from '../../interfaces/modals';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddTreeCategoryForm from '../Forms/TreeCategories/AddTreeCategoryForm/AddTreeCategoryForm';

interface FormDialogProps {
  dispatch: Dispatch;
  categoriesLength: number;
  modalData: IMainCategoriesModal;
}

const FormDialog: React.FC<FormDialogProps> = ({ dispatch, modalData }) => {
  const { handleClose, isOpened } = modalData;

  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="form-dialog-title">Нова категорія</DialogTitle>
      <DialogContent>
        <AddTreeCategoryForm dispatch={dispatch} closeModal={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
