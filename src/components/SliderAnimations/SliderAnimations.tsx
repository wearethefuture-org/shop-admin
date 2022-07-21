import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  fetchChangeActiveSliderAnimation,
  fetchSliderAnimations,
} from '../../store/actions/sliderAnimations.actions';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import useModal from '../../hooks/useModal';
import SlidesGallery from '../SlidesGallery/SlidesGallery';
import styles from './SliderAnimations.module.scss';

const SliderAnimations: React.FC = () => {
  const dispatch = useDispatch();
  const animationsData = useSelector((state: RootState) => state.sliderAnimations);
  const { handleClickOpen, isOpened, handleClose } = useModal();
  const [effect, setEffect] = useState<object | null>(null);

  const isAnimationChange = animationsData.id !== effect?.id;

  async function fetchData() {
    await dispatch(fetchSliderAnimations());
  }

  useEffect(() => {
    if (animationsData.animations.length === 0) {
      fetchData();
    }
  }, [animationsData.animations]);

  useEffect(() => {
    setEffect(animationsData);
  }, [animationsData]);

  function handleChangeActiveAnim(e) {
    const newActiveAnim = animationsData.animations.find((a) => a.animation === e.target.value);
    setEffect(newActiveAnim);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (isAnimationChange) {
      await dispatch(fetchChangeActiveSliderAnimation(effect?.id, true));
      await dispatch(fetchChangeActiveSliderAnimation(animationsData.id, false));
    }
  }

  function handleEmptyChangeClose() {
    setEffect(animationsData);
    handleClose();
  }

  console.log(effect);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Анімації слайдів
      </Button>
      <Dialog
        open={isOpened}
        onClose={handleEmptyChangeClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Вибір анімації слайдів</DialogTitle>
        <DialogContent dividers>
          <SlidesGallery customAnimation={effect?.animation} />
          <div className={styles.wrapper}>
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Анімації слайдів</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={effect?.animation}
                  onChange={handleChangeActiveAnim}
                >
                  {animationsData.animations
                    .sort((a, b) => a.animation.localeCompare(b.animation))
                    .map((a) => (
                      <FormControlLabel
                        key={a.id}
                        value={a.animation}
                        control={<Radio />}
                        label={a.animation}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
              <DialogActions>
                <Button
                  style={{ display: 'block', marginLeft: 'auto' }}
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                  type="submit"
                  disabled={isAnimationChange ? false : true}
                >
                  Зберегти
                </Button>
              </DialogActions>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SliderAnimations;
