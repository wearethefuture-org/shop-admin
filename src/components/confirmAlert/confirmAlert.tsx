import { Button, Dialog } from '@material-ui/core';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import styles from './confirmAlert.module.scss';

export const confirmDelete = (name: string, handleConfirm: () => void, warning: string): void => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <Dialog open={true}>
          <div className={styles['custom-confirm']}>
            <p>
              Видалити <span>{name}</span> ?
            </p>
            <p className={styles.warning}>{warning}</p>
            <div className={styles['btn-container']}>
              <Button variant="outlined" color="primary" onClick={onClose}>
                Ні
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  handleConfirm();
                  onClose();
                }}
              >
                Так
              </Button>
            </div>
          </div>
        </Dialog>
      );
    },
  });
};
