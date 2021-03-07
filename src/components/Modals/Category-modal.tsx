import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { Dispatch } from 'redux';

import { ICategoriesModal } from '../../interfaces/modals';
import CategoryForm from '../Forms/Category-form/CategoryAddForm/Category-form';

interface FormDialogProps {
  dispatch: Dispatch;
  categoriesLength: number;
  modalData: ICategoriesModal;
}

const FormDialog: React.FC<FormDialogProps> = ({ dispatch, modalData }) => {
  const { handleClickOpen, handleClose, isOpened } = modalData;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        <AddIcon /> New Category
      </Button>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Add new category</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Choose name of category.</DialogContentText>
          <CategoryForm dispatch={dispatch} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
