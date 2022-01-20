import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import { IDraw } from '../../../interfaces/IDraw';
import DrawCardForm from '../../Forms/DrawCard-form/DrawCard-form';

const useStyles = makeStyles({
  dialog: {
    'align-self': 'center',
  },
});

interface FormDialogProps {
  isNew: boolean;
  draw: IDraw | null;
  closeModal: () => void;
}

const DrawDialog: React.FC<FormDialogProps> = ({ isNew, draw, closeModal }) => {
  const classes = useStyles();
  const handleClose = () => {
    closeModal();
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="lg"
    >
      <div className={classes.dialog}>
        <DialogTitle id="form-dialog-title">
          {isNew ? 'Створення розіграшу' : 'Картка розіграшу'}
        </DialogTitle>
        <DialogContent dividers>
          <DrawCardForm closeModal={closeModal} isNew={isNew} draw={draw} />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default DrawDialog;
