import { IActions } from '../../interfaces/actions';
import { ISliderAnimation, ISliderAnimations } from '../../interfaces/ISliderAnimations';
import {
  CHANGE_ACTIVE_SLIDER_ANIMATION,
  GET_ACTIVE_SLIDER_ANIMATION,
  GET_SLIDER_ANIMATIONS,
  GET_SLIDER_ANIMATIONS_REQUEST,
  REQUEST_CHANGE_ACTIVE_SLIDER_ANIMATION,
} from '../types';

export const fetchSliderAnimations = (): IActions => ({ type: GET_SLIDER_ANIMATIONS_REQUEST });

export const getSliderAnimations = (sliderAnimations: ISliderAnimations): IActions => ({
  type: GET_SLIDER_ANIMATIONS,
  data: sliderAnimations,
});

export const getActiveSliderAnimation = (activeSliderAnimation: ISliderAnimation): IActions => ({
  type: GET_ACTIVE_SLIDER_ANIMATION,
  data: activeSliderAnimation,
});

export const fetchChangeActiveSliderAnimation = (id: number, isActive: boolean): IActions => ({
  type: REQUEST_CHANGE_ACTIVE_SLIDER_ANIMATION,
  data: { id, isActive },
});

export const changeActiveSliderAnimation = (id: number, isActive: boolean): IActions => ({
  type: CHANGE_ACTIVE_SLIDER_ANIMATION,
  data: { id, isActive },
});
