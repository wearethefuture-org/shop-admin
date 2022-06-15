import React, { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import styles from './CustomConfirm.module.scss';

interface ConfirmProps {
  openDisableDialog: boolean;
  closeDisableDialog: () => void;
  warning: string;
  handleDisable: () => void;
  dialogTitle: string;
}

const DisableCategoryConfirm: FC<ConfirmProps> = ({
  openDisableDialog,
  closeDisableDialog,
  warning,
  handleDisable,
  dialogTitle,
}) => {
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
        <Button onClick={closeDisableDialog} color="primary" className={styles['decline-btn']}>
          Ні
        </Button>
        <Button
          onClick={handleDisable}
          color="secondary"
          className={styles['confirm-btn']}
          autoFocus
        >
          Так
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisableCategoryConfirm;
