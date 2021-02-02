import { IActions } from '../../interfaces/actions';
import { ADD_CATEGORY, LOAD_CATEGORIES } from '../types';
import { ICategoriesData } from '../../interfaces/categories-data';

const data: ICategoriesData = {
  list: [],
};

const categories = (state = data, action: IActions) => {
  switch (action.type) {
    case LOAD_CATEGORIES: {
      return { ...state, list: action.data };
    }
    case ADD_CATEGORY: {
      return { ...state, list: [...state.list, action.data] };
    }
    default:
      return state;
  }
};

export default categories;
