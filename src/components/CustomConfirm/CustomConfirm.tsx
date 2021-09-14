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
  openDeleteDialog: boolean;
  closeDeleteDialog: () => void;
  name: string;
  warning: string;
  handleDelete: () => void;
}

const CustomConfirm: FC<ConfirmProps> = ({
  openDeleteDialog,
  closeDeleteDialog,
  name,
  warning,
  handleDelete,
}) => {
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
        <Button onClick={closeDeleteDialog} color="primary" className={styles['decline-btn']}>
          Ні
        </Button>
        <Button
          onClick={handleDelete}
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

export default CustomConfirm;
