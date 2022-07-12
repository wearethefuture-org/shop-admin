import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dispatch } from 'redux';

import { ISlidesModal } from '../../interfaces/modals';
import SlideForm from '../Forms/Slide-form/Slide-form';

interface FormDialogProps {
  dispatch: Dispatch,
  slidesLength: number,
  modalData: ISlidesModal,
}

const FormDialog: React.FC<FormDialogProps> = ({
                                                 dispatch,
                                                 modalData,
                                               }) => {

  const {handleClose, isOpened} = modalData;

  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Додати новий слайд</DialogTitle>
        <DialogContent dividers>
          <SlideForm
            dispatch={dispatch}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
