import { IActions } from '../../interfaces/actions';
import { IGetTreeCategoriesResponse } from '../../interfaces/ITreeCategory';
import {
  GET_TREE_CATEGORIES_REQUEST,
  GET_TREE_CATEGORIES_SUCCESS,
  ADD_TREE_CATEGORY,
  UPDATE_TREE_CATEGORY_REQUEST,
  UPDATE_TREE_CATEGORY_SUCCESS,
  UPDATE_TREE_CATEGORY_ERROR,
  DELETE_TREE_CATEGORY,
  GET_TREE_CATEGORIES_BY_ID_REQUEST,
  GET_TREE_CATEGORIES_BY_ID_SUCCESS,
  GET_TREE_CATEGORIES_BY_ID_ERROR,
  DISABLE_ENABLE_CATEGORY_ERROR,
  DISABLE_ENABLE_CATEGORY_SUCCESS,
  DISABLE_ENABLE_CATEGORY_REQUEST,
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
    case GET_TREE_CATEGORIES_REQUEST: {
      return {
        ...state,
        currentTreeCategory: null,
        loading: true,
        error: null,
      };
    }

    case GET_TREE_CATEGORIES_SUCCESS: {
      return {
        loading: false,
        list: data,
        currentTreeCategory: null,
        error: null,
      };
    }

    // add

    case ADD_TREE_CATEGORY: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case DELETE_TREE_CATEGORY: {
      return {
        ...state,
        loading: true,
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

    //disable_enable

    case DISABLE_ENABLE_CATEGORY_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case DISABLE_ENABLE_CATEGORY_SUCCESS: {
      return {
        ...state,
        currentTreeCategory: data,
        loading: false,
      };
    }

    case DISABLE_ENABLE_CATEGORY_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    // update
    case UPDATE_TREE_CATEGORY_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case UPDATE_TREE_CATEGORY_SUCCESS: {
      return {
        ...state,
        currentTreeCategory: data,
        loading: false,
      };
    }

    case UPDATE_TREE_CATEGORY_ERROR: {
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
