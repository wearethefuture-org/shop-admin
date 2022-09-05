import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoicesList, removeInvoiceRequest } from '../../../store/actions/invoice.actions';
import { COLORS } from '../../../values/colors';
import classnames from 'classnames';

interface RemoveProps {
  invoiceName: string;
  closeModal: () => void;
}

const useStyles = makeStyles({
  dialog: {
    'text-align': 'center',
  },
  btnWrapper: {
    margin: '10px',
  },
  btn: {
    marginLeft: '15px',
    borderRadius: '30px',
    width: '120px',
    padding: '6px 15px 6px 15px',
    color: COLORS.primaryLight,
  },
  btnRemoveLight: {
    'backgroundColor': COLORS.primaryGreen,
    '&:hover': {
      backgroundColor: COLORS.secondaryGreen,
    },
  },
  btnRemoveDark: {
    'backgroundColor': COLORS.secondaryDarkGreen,
    '&:hover': {
      backgroundColor: COLORS.darkGreen,
    },
  },
  btnCancelLight: {
    'backgroundColor': COLORS.primaryGray,
    '&:hover': {
      backgroundColor: COLORS.secondaryGray,
    },
  },
  btnCancelDark: {
    'backgroundColor': COLORS.secondaryDarkGray,
    '&:hover': {
      backgroundColor: COLORS.darkGray,
    },
  },
});

const InvoiceRemoveDialog: React.FC<RemoveProps> = ({ closeModal, invoiceName }) => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();

  const { darkMode } = useSelector((state: RootState) => state.theme);

  const handleClose = () => {
    closeModal();
  };

  const removeUser = async () => {
    await dispatch(removeInvoiceRequest(invoiceName));
    await dispatch(fetchInvoicesList());
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
      <div className={classes.btnWrapper}>
        <Button
          className={classnames(classes.btn, darkMode ? classes.btnRemoveDark : classes.btnRemoveLight)}
          onClick={handleClose}
        >
          Відміна
        </Button>
        <Button
          className={classnames(classes.btn, darkMode ? classes.btnCancelDark : classes.btnCancelLight)}
          onClick={removeUser}
        >
          Видалити
        </Button>
      </div>
    </Dialog>
  );
};

export default InvoiceRemoveDialog;
