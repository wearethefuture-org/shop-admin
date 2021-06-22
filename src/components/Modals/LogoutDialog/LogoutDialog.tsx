import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../../store/actions/user.action';

interface LogoutProps {
  closeModal: () => void;
}

const useStyles = makeStyles({
  dialog: {
    'text-align': 'center',
  },
  logout: {
    '&:hover': {
      background: '#fff',
      color: '#006A00',
    },
    'background': '#006A00',
    'border-radius': '10px',
    'color': '#fff',
    'width': '200px',
    'height': '44px',
    'margin': '10px',
    'border': '2px solid #006A00',
  },
});

const LogoutDialog: React.FC<LogoutProps> = ({ closeModal }) => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    closeModal();
  };

  const logoutIvent = () => {
    dispatch(signOutUser());
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
      <DialogTitle id="form-dialog-title">Вихід</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>Ви дійсно бажаєте вийти</DialogContentText>
      </DialogContent>
      <div>
        <Button className={classes.logout} onClick={handleClose}>
          Залишитись
        </Button>
        <Button className={classes.logout} onClick={logoutIvent}>
          Вийти
        </Button>
      </div>
    </Dialog>
  );
};

export default LogoutDialog;