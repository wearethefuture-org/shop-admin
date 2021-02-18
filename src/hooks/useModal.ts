import { useState } from 'react';

const useModal = () => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleModal = () => {
    setIsOpened(!isOpened);
  };

  return {
    isOpened,
    toggleModal,
  };
};

export default useModal;
