import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { removeInvoiceRequest } from '../../../store/actions/invoice.actions';

interface RemoveProps {
  invoiceName: string;
  closeModal: () => void;
}

const useStyles = makeStyles({
  dialog: {
    'text-align': 'center',
  },
  remove: {
    'background': '#424D52',
    'border-radius': '60px',
    'color': '#fff',
    'border': ' none',
    'width': '200px',
    'height': '44px',
    'margin': '10px',
  },
});

const InvoiceRemoveDialog: React.FC<RemoveProps> = ({ closeModal, invoiceName }) => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    closeModal();
  };

  const removeUser = () => {
    dispatch(removeInvoiceRequest(invoiceName));
    closeModal();
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="xs"
      className={classes.dialog}
    >
      <DialogTitle id="form-dialog-title">Видалення</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>Ви дійсно бажаєте видалити файл {invoiceName}?</DialogContentText>
      </DialogContent>
      <div>
        <Button className={classes.remove} onClick={handleClose}>
          Відміна
        </Button>
        <Button className={classes.remove} onClick={removeUser}>
          Видалити
        </Button>
      </div>
    </Dialog>
  );
};

export default InvoiceRemoveDialog;
