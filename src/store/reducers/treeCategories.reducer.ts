import { IActions } from '../../interfaces/actions';
import { IGetTreeCategoriesResponse } from '../../interfaces/ITreeCategory';
import { LOAD_TREE_CATEGORIES, GET_TREE_CATEGORIES_BY_KEY } from '../types';

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

    case GET_TREE_CATEGORIES_BY_KEY: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    default:
      return state;
  }
};

export default treeCategories;
