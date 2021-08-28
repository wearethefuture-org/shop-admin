import { IActions } from '../../interfaces/actions';
import { IGetTreeCategoriesResponse } from '../../interfaces/ITreeCategory';
import {
  LOAD_TREE_CATEGORIES,
  GET_TREE_CATEGORIES_BY_ID_REQUEST,
  GET_TREE_CATEGORIES_BY_ID_SUCCESS,
  GET_TREE_CATEGORIES_BY_ID_ERROR,
} from '../types';

interface ITreeCategoriesState {
  list: IGetTreeCategoriesResponse[];
  loading: boolean;
  currentTreeCategory: IGetTreeCategoriesResponse | null;
  error: string | null;
}

const initialState: ITreeCategoriesState = {
  loading: false,
  list: [],
  currentTreeCategory: null,
  error: null,
};

const treeCategories = (state = initialState, { type, data }: IActions) => {
  switch (type) {
    case LOAD_TREE_CATEGORIES: {
      return {
        loading: false,
        list: data,
        currentTreeCategory: null,
        error: null,
      };
    }

    // get one by id
    case GET_TREE_CATEGORIES_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case GET_TREE_CATEGORIES_BY_ID_SUCCESS: {
      return {
        ...state,
        currentTreeCategory: data,
        loading: false,
      };
    }

    case GET_TREE_CATEGORIES_BY_ID_ERROR: {
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

export default treeCategories;
