import React from 'react';
import { Dispatch } from 'redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './AddTreeCategoryModal.module.scss';
import AddTreeCategoryForm from '../../../Forms/TreeCategories/AddTreeCategoryForm/AddTreeCategoryForm';

interface IParentInfo {
  id?: number;
  name: string;
}

interface ModalCategoryProps {
  dispatch: Dispatch;
  parentInfo: IParentInfo;
  closeModal: () => void;
}

const AddTreeCategoryModal: React.FC<ModalCategoryProps> = ({
  dispatch,
  parentInfo,
  closeModal,
}) => {
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
        <DialogTitle id="form-dialog-title">Додавання нової категорії</DialogTitle>
        <DialogContent dividers>
          <div className={styles.container}>
            <span>
              Категорія: <b>{parentInfo.name}</b>
            </span>
            <AddTreeCategoryForm
              dispatch={dispatch}
              parentId={parentInfo.id}
              closeModal={closeModal}
            />
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AddTreeCategoryModal;
