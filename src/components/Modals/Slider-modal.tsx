import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import {Dispatch} from 'redux';

import {ISlidersModal} from '../../interfaces/modals';
import SliderForm from '../Forms/Slider-form/Slider-form';

interface FormDialogProps {
    dispatch: Dispatch,
    slidersLength: number,
    modalData: ISlidersModal,
}

const FormDialog: React.FC<FormDialogProps> = ({
                                                   dispatch,
                                                   modalData,
                                               }) => {

    const {handleClickOpen, handleClose, isOpened} = modalData;

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                <AddIcon/> New Slider
            </Button>
            <Dialog
                open={isOpened}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle id="form-dialog-title">Add new slider</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>Choose name of slider.</DialogContentText>
                    <SliderForm
                        dispatch={dispatch}
                        handleClose={handleClose}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FormDialog;
