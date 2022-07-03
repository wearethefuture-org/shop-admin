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
        <Button onClick={closeDeleteDialog} className={classes.declineButton}>
          Ні
        </Button>
        <Button onClick={handleDelete} className={classes.confirmButton}>
          Так
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomConfirm;
