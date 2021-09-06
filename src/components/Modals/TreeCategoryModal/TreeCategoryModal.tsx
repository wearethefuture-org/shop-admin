import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ITreeCategory } from '../../../interfaces/ITreeCategory';
import TreeCategoryBasicInfo from '../../../pages/TreeCategories/TreeCategoryInfo/TreeCategoryBasicInfo/TreeCategoryBasicInfo';
import EditTreeCategoryModalForm from '../../Forms/TreeCategories/EditTreeCategoryModalForm/EditTreeCategoryModalForm';
import DeleteTreeCategoryModal from '../TreeCategoryModal/DeleteTreeCategoryModal/DeleteTreeCategoryModal';
import styles from './TreeCategoryModal.module.scss';
import Button from '@material-ui/core/Button';

interface ModalCategoryProps {
  category: ITreeCategory;
  closeModal: () => void;
}

const TreeCategoryModal: React.FC<ModalCategoryProps> = ({ category, closeModal }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const handleClose = () => {
    setEditMode(false);
    closeModal();
  };

  const closeDeleteModal = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      {openDeleteDialog && (
        <DeleteTreeCategoryModal
          handleClose={closeDeleteModal}
          categoryInfo={{ id: category.id, name: category.name }}
        />
      )}
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <div>
          <DialogTitle id="form-dialog-title">
            {!editMode ? 'Інформація про категорію' : 'Редагування категорії'}
          </DialogTitle>
          <DialogContent dividers>
            {!editMode ? (
              <div className={styles.infoModal}>
                <TreeCategoryBasicInfo category={category} />
                <div className={styles.modalButtons}>
                  <Button onClick={() => setEditMode(true)} variant="contained">
                    Редагувати
                  </Button>
                  <Button
                    onClick={() => setOpenDeleteDialog(true)}
                    variant="contained"
                    color="secondary"
                  >
                    Видалити
                  </Button>
                  <Button onClick={handleClose} color="primary" variant="contained">
                    Закрити
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles.editModal}>
                <EditTreeCategoryModalForm category={category} closeModal={handleClose} />
              </div>
            )}
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default TreeCategoryModal;
