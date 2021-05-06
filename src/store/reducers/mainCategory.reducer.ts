import { IActions } from '../../interfaces/actions';
import { IMainCategoryResponse, IGetMainCategoriesResponse } from '../../interfaces/IMainCategory';
import {
  ADD_MAIN_CATEGORY,
  GET_MAIN_CATEGORY_BY_ID_ERROR,
  GET_MAIN_CATEGORY_BY_ID_REQUEST,
  GET_MAIN_CATEGORY_BY_ID_SUCCESS,
  LOAD_MAIN_CATEGORIES,
  UPDATE_MAIN_CATEGORY_ERROR,
  UPDATE_MAIN_CATEGORY_REQUEST,
  UPDATE_MAIN_CATEGORY_SUCCESS,
} from '../types';

interface IMainCategoriesState {
  list: IGetMainCategoriesResponse[];
  loading: boolean;
  currentMainCategory: IMainCategoryResponse | null;
  error: string | null;
}

const initialState: IMainCategoriesState = {
  loading: false,
  list: [],
  currentMainCategory: null,
  error: null,
};

const mainCategories = (state = initialState, { type, data }: IActions) => {
  switch (type) {
    case LOAD_MAIN_CATEGORIES: {
      return {
        loading: false,
        list: data,
        currentMainCategory: null,
        error: null,
      };
    }
    case ADD_MAIN_CATEGORY: {
      return {
        ...state,
        loading: false,
        list: [...state.list, data],
      };
    }

    case GET_MAIN_CATEGORY_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case GET_MAIN_CATEGORY_BY_ID_SUCCESS: {
      return {
        ...state,
        currentMainCategory: data,
        loading: false,
      };
    }

    case GET_MAIN_CATEGORY_BY_ID_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    case UPDATE_MAIN_CATEGORY_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case UPDATE_MAIN_CATEGORY_SUCCESS: {
      return {
        ...state,
        currentMainCategory: data,
        loading: false,
      };
    }

    case UPDATE_MAIN_CATEGORY_ERROR: {
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

export default mainCategories;
