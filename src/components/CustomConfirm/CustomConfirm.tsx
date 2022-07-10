import React, { FC } from 'react';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  ThemeOptions,
} from '@material-ui/core';
import { COLORS } from '../../values/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ConfirmProps {
  openDeleteDialog: boolean;
  closeDeleteDialog: () => void;
  name: string;
  warning: string;
  handleDelete: () => void;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      declineButton: {
        'borderRadius': '30px',
        'color': COLORS.primaryLight,
        'backgroundColor': COLORS.primaryGray,
        '&:hover': {
          backgroundColor: COLORS.secondaryGray,
        },
      },
      confirmButton: {
        'borderRadius': '30px',
        'color': COLORS.primaryLight,
        'backgroundColor': COLORS.primaryRed,
        '&:hover': {
          backgroundColor: COLORS.secondaryRed,
        },
      },
      confirmButton: {
        'borderRadius': '30px',
        'color': COLORS.primaryLight,
        'backgroundColor': COLORS.primaryRed,
        '&:hover': {
          backgroundColor: COLORS.secondaryRed,
        },
      },
      confirmButtonDark: {
        'borderRadius': '30px',
        'color': COLORS.primaryLight,
        'backgroundColor': COLORS.darkRed,
        '&:hover': {
          backgroundColor: COLORS.secondaryDarkRed,
        },
      },
    })
);

const CustomConfirm: FC<ConfirmProps> = ({
  openDeleteDialog,
  closeDeleteDialog,
  name,
  warning,
  handleDelete,
}) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state: RootState) => state.theme);
  return (
    <Dialog
      open={openDeleteDialog}
      onClose={closeDeleteDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Видалити <span>{name}</span>?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{warning}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeDeleteDialog}
          className={darkMode ? classes.declineButtonDark : classes.declineButton}
        >
          Ні
        </Button>
        <Button
          onClick={handleDelete}
          className={darkMode ? classes.confirmButtonDark : classes.confirmButton}
        >
          Так
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomConfirm;
