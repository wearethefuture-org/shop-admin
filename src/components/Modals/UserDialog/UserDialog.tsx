import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { IUserItem } from '../../../interfaces/IUsers';
import UserCardForm from '../../Forms/UserCard-form/UserCard-form';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dialog: {
    'align-self': 'center',
  },
});

interface FormDialogProps {
  isNew: boolean;
  user: IUserItem | null;
  closeModal: () => void;
}

const UserDialog: React.FC<FormDialogProps> = ({ isNew, user, closeModal }) => {
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
      maxWidth="xs"
    >
      <div className={classes.dialog}>
        <DialogTitle id="form-dialog-title">
          {isNew ? 'Створення користувача' : 'Картка користувача'}
        </DialogTitle>
        <DialogContent dividers>
          <UserCardForm closeModal={closeModal} isNew={isNew} user={user} />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default UserDialog;
