import { IActions } from '../../interfaces/actions';
import { ISliderAnimation, ISliderAnimations } from '../../interfaces/ISliderAnimations';
import {
  GET_ACTIVE_SLIDER_ANIMATION,
  GET_SLIDER_ANIMATIONS,
  GET_SLIDER_ANIMATIONS_REQUEST,
  REQUEST_SET_ACTIVE_SLIDER_ANIMATION,
  REQUEST_SET_INACTIVE_SLIDER_ANIMATION,
  SET_ACTIVE_SLIDER_ANIMATION,
  SET_INACTIVE_SLIDER_ANIMATION,
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

export const fetchSetActiveSliderAnimation = (id: number): IActions => ({
  type: REQUEST_SET_ACTIVE_SLIDER_ANIMATION,
  data: id,
});

export const fetchSetInActiveSliderAnimation = (id: number): IActions => ({
  type: REQUEST_SET_INACTIVE_SLIDER_ANIMATION,
  data: id,
});

export const setActiveSliderAnimation = (id: number): IActions => ({
  type: SET_ACTIVE_SLIDER_ANIMATION,
  data: id,
});

export const setInactiveSliderAnimation = (id: number): IActions => ({
  type: SET_INACTIVE_SLIDER_ANIMATION,
  data: id,
});
