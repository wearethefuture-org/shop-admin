import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface ModalCategoryProps {
  type: string;
  categoryId: number;
  closeModal: () => void;
}

enum Title {
  info = 'Інформація про категорію',
  edit = 'Редагування категорії',
  add = 'Додавання категорії',
}

const TreeCategoryModal: React.FC<ModalCategoryProps> = ({ type, categoryId, closeModal }) => {
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
      <div>
        <DialogTitle id="form-dialog-title">{Title[type]}</DialogTitle>
        <DialogContent dividers>
          <span>modal info here</span>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default TreeCategoryModal;
