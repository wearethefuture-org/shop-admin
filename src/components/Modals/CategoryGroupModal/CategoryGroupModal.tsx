import { Dialog } from '@material-ui/core';
import React from 'react';

// import styles from './CategoryGroupModal.module.scss';

interface IModalProps {
  openNewGroupModal: boolean;
  setOpenNewGroupModal: (boolean) => void;
}

const CategoryGroupModal: React.FC<IModalProps> = ({ openNewGroupModal, setOpenNewGroupModal }) => {
  return (
    <Dialog open={openNewGroupModal} onClose={() => setOpenNewGroupModal(false)}>
      CategoryGroup
    </Dialog>
  );
};

export default CategoryGroupModal;
