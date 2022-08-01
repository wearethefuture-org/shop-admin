import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { deleteUserRequest } from '../../../store/actions/users.actions';
import { IUserItem } from '../../../interfaces/IUsers';
import { COLORS } from '../../../values/colors';
import classNames from 'classnames';

interface RemoveProps {
  user: IUserItem;
  closeModal: () => void;
  darkMode: boolean;
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
  btn: {
    padding: '6px 15px 6px 15px',
    color: COLORS.primaryLight,
    borderRadius: '30px',
    margin: '10px',
  },
  removeButton: {
    'background': COLORS.primaryGreen,
    '&:hover': {
      background: COLORS.secondaryGreen,
    },
  },
  removeButtonDark: {
    'background': COLORS.darkGreen,
    '&:hover': {
      background: COLORS.secondaryDarkGreen,
    },
  },
  cancelButton: {
    'background': COLORS.primaryGray,
    '&:hover': {
      background: COLORS.secondaryGray,
    },
  },
  cancelButtonDark: {
    'background': COLORS.darkGray,
    '&:hover': {
      background: COLORS.secondaryDarkGray,
    },
  },
});

const UserRemoveDialog: React.FC<RemoveProps> = ({ closeModal, user, darkMode }) => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    closeModal();
  };

  const removeUser = () => {
    dispatch(deleteUserRequest(user.id));
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
        <DialogContentText>
          Ви дійсно бажаєте видалити користувача {user.firstName} {user.lastName}?
        </DialogContentText>
      </DialogContent>
      <div>
        <Button
          className={classNames(
            classes.btn,
            darkMode ? classes.cancelButtonDark : classes.cancelButton
          )}
          onClick={handleClose}
        >
          Відміна
        </Button>
        <Button
          className={classNames(
            classes.btn,
            darkMode ? classes.removeButtonDark : classes.removeButton
          )}
          onClick={removeUser}
        >
          Видалити
        </Button>
      </div>
    </Dialog>
  );
};

export default UserRemoveDialog;
