import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSetActiveSliderAnimation,
  fetchSetInActiveSliderAnimation,
  fetchSliderAnimations,
} from '../../store/actions/sliderAnimations.actions';
import { RootState } from '../../store/store';
import styles from './SliderAnimations.module.scss';

const SliderAnimations: React.FC = () => {
  const dispatch = useDispatch();
  const animationsData = useSelector((state: RootState) => state.sliderAnimations);

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchSliderAnimations());
    }
    if (animationsData.animations.length === 0) {
      fetchData();
    }
  }, [animationsData]);

  async function handleChangeActiveAnim(e) {
    const newActiveAnim = animationsData.animations.find((a) => a.animation === e.target.value);
    await dispatch(fetchSetActiveSliderAnimation(newActiveAnim.id));
    await dispatch(fetchSetInActiveSliderAnimation(animationsData.id));
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
          {animationsData.animations.map((a) => (
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
