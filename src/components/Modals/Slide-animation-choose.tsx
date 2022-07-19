import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import useModal from '../../hooks/useModal';
import SliderAnimations from '../SliderAnimations/SliderAnimations';
import SlidesGallery from '../SlidesGallery/SlidesGallery';

const AnimationsChoose: React.FC = () => {
  const { handleClickOpen, isOpened, handleClose } = useModal();

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Анімації слайдів
      </Button>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Вибір анімації слайдів</DialogTitle>
        <DialogContent dividers>
          <SlidesGallery />
          <SliderAnimations />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ display: 'block', marginLeft: 'auto' }}
            variant="contained"
            color="secondary"
            onClick={handleClose}
          >
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AnimationsChoose;
