import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import CategoryForm from '../Forms/Category-form';
import { Dispatch } from 'redux';

interface FormDialogProps {
  isModalOpened: boolean,
  toggleModalHandler: (state: boolean) => void,
  dispatch: Dispatch,
  categoriesLength: number
}

const FormDialog: React.FC<FormDialogProps> = ({
  isModalOpened,
  toggleModalHandler,
  dispatch,
  categoriesLength,
}) => {
  const handleClickOpen = () => {
    toggleModalHandler(true);
  };

  const handleClose = () => {
    toggleModalHandler(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        <AddIcon /> New Category
      </Button>
      <Dialog
        open={isModalOpened}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Add new category</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Choose name of category.</DialogContentText>
          <CategoryForm
            dispatch={dispatch}
            categoriesLength={categoriesLength}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
