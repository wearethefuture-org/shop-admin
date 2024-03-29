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
import classNames from 'classnames';

interface FormDialogProps {
  dispatch: Dispatch;
  slidesLength: number;
  modalData: ISlidesModal;
  row: ISlideItem;
  darkMode: boolean;
}

const useStyles = makeStyles(
  (t): ThemeOptions =>
    createStyles({
      icon: {
        cursor: 'pointer',
        transition: '0.3s all',
      },
      iconLight: {
        'color': COLORS.primaryBlue,
        '&:hover': {
          color: COLORS.secondaryBlue,
        },
      },
      iconDark: {
        'color': COLORS.darkBlue,
        '&:hover': {
          color: COLORS.secondaryDarkBlue,
        },
      },
    })
);

const FormDialog: React.FC<FormDialogProps> = ({ dispatch, modalData, row, darkMode }) => {
  const classes = useStyles();
  const { handleClickOpen, handleClose, isOpened } = modalData;

  return (
    <div>
      <EditIcon
        className={classNames(classes.icon, darkMode ? classes.iconDark : classes.iconLight)}
        onClick={handleClickOpen}
      />
      <Dialog
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Редагувати слайд</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Змінити ім'я слайду</DialogContentText>
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
