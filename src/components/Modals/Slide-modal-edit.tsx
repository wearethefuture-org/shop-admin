import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import { Dispatch } from 'redux';

import { ISlidesModal } from '../../interfaces/modals';
import SlideForm from '../Forms/Slide-form/Slide-form';
import { SlideTableData } from "../../interfaces/ISlides";

interface FormDialogProps {
  dispatch: Dispatch,
  slidesLength: number,
  modalData: ISlidesModal,
  row: SlideTableData,
}

const FormDialog: React.FC<FormDialogProps> = ({
                                                 dispatch,
                                                 modalData,
                                                 row,
                                               }) => {

  const {handleClickOpen, handleClose, isOpened} = modalData;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        <EditIcon/>
      </Button>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Edit slide</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Change name of slide</DialogContentText>
          <SlideForm
            initialId={row.id}
            initialName={row.name}
            initialText={row.text}
            initialImage={row.image as string}
            initialImageMobile={row.imageMobile as string}
            initialHref={row.href}
            initialIsShown={row.isShown}
            initialPriority={row.priority}
            dispatch={dispatch}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
