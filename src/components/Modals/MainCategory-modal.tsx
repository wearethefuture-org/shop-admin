import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dispatch } from 'redux';

import { IMainCategoriesModal } from '../../interfaces/modals';
import MainCategoryForm from '../Forms/MainCategory-form/CategoryAddForm/MainCategory-form';

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
        <MainCategoryForm dispatch={dispatch} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
