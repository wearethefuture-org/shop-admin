import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dispatch } from 'redux';
import { IMainCategoriesModal } from '../../interfaces/modals';
import AddLotteryForm from '../Forms/Lottery/AddLottery/addLotteryForm';

interface FormDialogProps {
  dispatch: Dispatch;
  modalData: IMainCategoriesModal;
}

const LotteryModal: React.FC<FormDialogProps> = ({ dispatch, modalData }) => {
  const { handleClose, isOpened } = modalData;

  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="form-dialog-title">Новий конкурс</DialogTitle>
      <DialogContent>
        <AddLotteryForm dispatch={dispatch} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default LotteryModal;
