import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dispatch } from 'redux';

import { ICategoriesModal } from '../../interfaces/modals';
import CategoryForm from '../Forms/Category-form/CategoryAddForm/Category-form';

interface FormDialogProps {
  dispatch: Dispatch;
  categoriesLength: number;
  modalData: ICategoriesModal;
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
        <CategoryForm dispatch={dispatch} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
