import { IActions } from '../../interfaces/actions';
import {
  ADD_CATEGORY,
  GET_CATEGORY_BY_ID_ERROR,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_SUCCESS,
  LOAD_CATEGORIES,
  UPDATE_CATEGORY_ERROR,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
} from '../types';
import { ICategoriesData } from '../../interfaces/ICategory';

const initialState: ICategoriesData = {
  loading: false,
  list: [],
  currentCategory: null,
  error: null,
};

const categories = (state = initialState, { type, data }: IActions) => {
  switch (type) {
    case LOAD_CATEGORIES: {
      return { ...state, list: data };
    }
    case ADD_CATEGORY: {
      return { ...state, list: [...state.list, data] };
    }

    // get one by id
    case GET_CATEGORY_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case GET_CATEGORY_BY_ID_SUCCESS: {
      return {
        ...state,
        currentCategory: data,
        loading: false,
      };
    }

    case GET_CATEGORY_BY_ID_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    // update category
    case UPDATE_CATEGORY_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case UPDATE_CATEGORY_SUCCESS: {
      return {
        ...state,
        currentCategory: data,
        loading: false,
      };
    }

    case UPDATE_CATEGORY_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    default:
      return state;
  }
};

export default categories;
