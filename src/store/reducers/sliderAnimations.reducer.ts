import { IActions } from '../../interfaces/actions';
import { ISliderAnimationsData } from '../../interfaces/ISliderAnimations';
import {
  CHANGE_ACTIVE_SLIDER_ANIMATION,
  GET_ACTIVE_SLIDER_ANIMATION,
  GET_SLIDER_ANIMATIONS,
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
    case CHANGE_ACTIVE_SLIDER_ANIMATION: {
      const newAnims = state.animations.map((a) => {
        a.active = a.id === action.data.id ? (action.data.isActive ? true : false) : a.active;
        return a;
      });
      if (action.data.isActive)
        return {
          ...state,
          id: action.data.id,
          animation: state.animations.find((a) => a.id === action.data.id).animation,
          active: action.data.isActive ? true : false,
          animations: newAnims,
        };
    }
    default:
      return state;
  }
};

export default sliderAnimations;
