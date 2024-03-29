import { useState } from 'react';

const useCategoriesModal = () => {
  const [isOpened, toggleModal] = useState(false);

  const handleClickOpen = () => {
    toggleModal(true);
  };

  const handleClose = () => {
    toggleModal(false);
  };

  return {
    handleClickOpen,
    handleClose,
    isOpened,
  };
};

export default useCategoriesModal;
