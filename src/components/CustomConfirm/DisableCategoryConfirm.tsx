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
  openDisableDialog: boolean;
  closeDisableDialog: () => void;
  warning: string;
  handleDisable: () => void;
  dialogTitle: string;
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

const DisableCategoryConfirm: FC<ConfirmProps> = ({
  openDisableDialog,
  closeDisableDialog,
  warning,
  handleDisable,
  dialogTitle,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={openDisableDialog}
      onClose={closeDisableDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{warning}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDisableDialog} className={classes.declineButton}>
          Ні
        </Button>
        <Button onClick={handleDisable} className={classes.confirmButton}>
          Так
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisableCategoryConfirm;
