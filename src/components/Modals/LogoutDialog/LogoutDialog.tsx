import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../../store/actions/user.action';
import { COLORS } from '../../../values/colors';
import classNames from 'classnames';

interface LogoutProps {
  closeModal: () => void;
}

const useStyles = makeStyles({
  dialog: {
    'text-align': 'center',
  },
  btn: {
    'border-radius': '10px',
    'width': '200px',
    'height': '44px',
    'margin': '10px',
  },
  logoutLightBtn: {
    '&:hover': {
      background: COLORS.primaryLight,
      color: COLORS.primaryGreen,
    },
    'background': COLORS.primaryGreen,
    'color': COLORS.primaryLight,
    'border': `2px solid ${COLORS.primaryGreen}`,
  },
  logoutDarkBtn: {
    '&:hover': {
      background: COLORS.secondaryDarkGreen,
    },
    'background': COLORS.darkGreen,
    'color': COLORS.primaryLight,
  },
  stayLoggedInLightBtn: {
    '&:hover': {
      background: COLORS.primaryLight,
      color: COLORS.primaryGray,
    },
    'background': COLORS.primaryGray,
    'color': COLORS.primaryLight,
    'border': `2px solid ${COLORS.primaryGray}`,
  },
  stayLoggedInDarkBtn: {
    '&:hover': {
      background: COLORS.darkGray,
    },
    'background': COLORS.secondaryDarkGray,
    'color': COLORS.primaryLight,
  },
});

const LogoutDialog: React.FC<LogoutProps> = ({ closeModal }) => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();
  const { darkMode } = useSelector((state: RootState) => state.theme);

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
        <DialogContentText>Ви дійсно бажаєте вийти?</DialogContentText>
      </DialogContent>
      <div>
        <Button
          className={classNames(
            classes.btn,
            darkMode ? classes.stayLoggedInDarkBtn : classes.stayLoggedInLightBtn
          )}
          onClick={handleClose}
        >
          Залишитись
        </Button>
        <Button
          className={classNames(
            classes.btn,
            darkMode ? classes.logoutDarkBtn : classes.logoutLightBtn
          )}
          onClick={logoutIvent}
        >
          Вийти
        </Button>
      </div>
    </Dialog>
  );
};

export default LogoutDialog;
