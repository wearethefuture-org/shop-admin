import { IActions } from '../../interfaces/actions';
import { ISliderAnimationsData } from '../../interfaces/ISliderAnimations';
import {
  GET_ACTIVE_SLIDER_ANIMATION,
  GET_SLIDER_ANIMATIONS,
  SET_ACTIVE_SLIDER_ANIMATION,
  SET_INACTIVE_SLIDER_ANIMATION,
} from '../types';

const initialState: ISliderAnimationsData = {
  id: 0,
  animation: '',
  active: false,
  animations: [],
};

const sliderAnimations = (state = initialState, { type, data }: IActions) => {
  switch (type) {
    case GET_SLIDER_ANIMATIONS: {
      return {
        ...state,
        animations: data,
      };
    }
    case GET_ACTIVE_SLIDER_ANIMATION: {
      return {
        ...state,
        id: data.id,
        animation: data.animation,
        active: data.active,
      };
    }
    case SET_ACTIVE_SLIDER_ANIMATION: {
      return {
        ...state,
        id: data.id,
      };
    }
    case SET_INACTIVE_SLIDER_ANIMATION: {
      return {
        ...state,
        id: data.id,
      };
    }
  }
};

export default sliderAnimations;
