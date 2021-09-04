import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ITreeCategory } from '../../../../interfaces/ITreeCategory';
import TreeCategoryBasicInfo from '../../../../pages/TreeCategories/TreeCategoryInfo/TreeCategoryBasicInfo/TreeCategoryBasicInfo';
import styles from './MainTreeCategoryModal.module.scss';
import Button from '@material-ui/core/Button';

interface ModalCategoryProps {
  category: ITreeCategory;
  closeModal: () => void;
}

const MainTreeCategoryModal: React.FC<ModalCategoryProps> = ({ category, closeModal }) => {
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
        <DialogTitle id="form-dialog-title">Інформація про основну категорію</DialogTitle>
        <DialogContent dividers>
          <div className={styles.infoModal}>
            <TreeCategoryBasicInfo category={category} />
            <span className={styles.closeBtn}>
              <Button onClick={handleClose} variant="contained" color="primary">
                Закрити
              </Button>
            </span>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default MainTreeCategoryModal;
