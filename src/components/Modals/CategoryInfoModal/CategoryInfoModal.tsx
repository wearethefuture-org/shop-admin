import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dialog: {
    'align-self': 'center',
  },
});

interface FormDialogProps {
  toggleInfoModal: (status) => void;
}

const CategoryInfoModal: React.FC<FormDialogProps> = ({ toggleInfoModal }) => {
  const styles = useStyles();
  const handleClose = () => {
    toggleInfoModal(false);
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <div className={styles.dialog}>
        <DialogTitle id="form-dialog-title">Інформація про категорію</DialogTitle>
        <DialogContent dividers>123</DialogContent>
      </div>
    </Dialog>
  );
};

export default CategoryInfoModal;
