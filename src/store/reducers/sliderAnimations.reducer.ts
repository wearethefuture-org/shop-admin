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

const sliderAnimations = (state = initialState, action: IActions) => {
  switch (action.type) {
    case GET_SLIDER_ANIMATIONS: {
      return {
        ...state,
        animations: action.data,
      };
    }
    case GET_ACTIVE_SLIDER_ANIMATION: {
      return {
        ...state,
        id: action.data.id,
        animation: action.data.animation,
        active: action.data.active,
      };
    }
    case SET_ACTIVE_SLIDER_ANIMATION: {
      const newAnims = state.animations.map((a) => {
        if (a.id === action.data.id) {
          a.active = true;
          return a;
        } else {
          return a;
        }
      });
      return {
        ...state,
        id: action.data.id,
        animation: state.animations.find((a) => a.id === action.data.id).animation,
        active: true,
        animations: newAnims,
      };
    }
    case SET_INACTIVE_SLIDER_ANIMATION: {
      const newAnims = state.animations.map((a) => {
        if (a.id === action.data.id) {
          a.active = false;
          return a;
        } else {
          return a;
        }
      });

      return {
        ...state,
        animations: newAnims,
      };
    }
    default:
      return state;
  }
};

export default sliderAnimations;
