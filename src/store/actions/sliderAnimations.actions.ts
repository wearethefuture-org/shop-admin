import { IActions } from '../../interfaces/actions';
import { ISliderAnimation, ISliderAnimations } from '../../interfaces/ISliderAnimations';
import {
  GET_ACTIVE_SLIDER_ANIMATION,
  GET_SLIDER_ANIMATIONS,
  SET_ACTIVE_SLIDER_ANIMATION,
  SET_INACTIVE_SLIDER_ANIMATION,
} from '../types';

export const getSliderAnimations = (): IActions => ({
  type: GET_SLIDER_ANIMATIONS,
});

export const getActiveSliderAnimation = (): IActions => ({
  type: GET_ACTIVE_SLIDER_ANIMATION,
});

export const setActiveSliderAnimation = (id: number): IActions => ({
  type: SET_ACTIVE_SLIDER_ANIMATION,
  data: id,
});

export const setInactiveSliderAnimation = (id: number): IActions => ({
  type: SET_INACTIVE_SLIDER_ANIMATION,
  data: id,
});
