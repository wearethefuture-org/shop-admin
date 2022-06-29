import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import { Dispatch } from 'redux';

import { ISlidesModal } from '../../interfaces/modals';
import SlideForm from '../Forms/Slide-form/Slide-form';
import { ISlideItem } from '../../interfaces/ISlides';
import { createStyles, makeStyles, ThemeOptions } from '@material-ui/core';
import { COLORS } from '../../values/colors';

interface FormDialogProps {
  dispatch: Dispatch;
  slidesLength: number;
  modalData: ISlidesModal;
  row: ISlideItem;
}

const useStyles = makeStyles(
  (t): ThemeOptions =>
    createStyles({
      icon: {
        'cursor': 'pointer',
        'color': COLORS.primaryBlue,
        'transition': '0.3s all',

        '&:hover': {
          color: COLORS.secondaryBlue,
        },
      },
    })
);

const FormDialog: React.FC<FormDialogProps> = ({ dispatch, modalData, row }) => {
  const classes = useStyles();
  const { handleClickOpen, handleClose, isOpened } = modalData;

  return (
    <div>
      <EditIcon className={classes.icon} onClick={handleClickOpen} />
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
