import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchChangeActiveSliderAnimation,
  fetchSliderAnimations,
} from '../../store/actions/sliderAnimations.actions';
import { RootState } from '../../store/store';
import styles from './SliderAnimations.module.scss';

const SliderAnimations: React.FC = () => {
  const dispatch = useDispatch();
  const animationsData = useSelector((state: RootState) => state.sliderAnimations);

  async function fetchData() { 
    await dispatch(fetchSliderAnimations());
  }

  useEffect(() => {
    if (animationsData.animations.length === 0) {
      fetchData();
    }
  }, [animationsData.animations]);

  async function handleChangeActiveAnim(e) {
    const newActiveAnim = animationsData.animations.find((a) => a.animation === e.target.value);
    await dispatch(fetchChangeActiveSliderAnimation(newActiveAnim.id, true));
    await dispatch(fetchChangeActiveSliderAnimation(animationsData.id, false));
  }

  return (
    <div className={styles.wrapper}>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Анімації слайдів</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={animationsData.animation}
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
    </div>
  );
};

export default SliderAnimations;
