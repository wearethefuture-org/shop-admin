import { IActions } from '../../interfaces/actions';
import { ISearchState } from '../../interfaces/ISearch';
import {
  GET_SEARCH_ITEMS_ERROR,
  GET_SEARCH_ITEMS_REQUEST,
  GET_SEARCH_ITEMS_SUCCESS,
} from '../types';

const initialState: ISearchState = {
  list: [],
  count: 0,
  totalPages: 0,
  error: null,
  loading: false,
};

const search = (state = initialState, { type, data }: IActions) => {
  switch (type) {
    case GET_SEARCH_ITEMS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_SEARCH_ITEMS_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: data.data,
        count: data.count,
        totalPages: data.totalPages,
      };
    }

    case GET_SEARCH_ITEMS_ERROR: {
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

export default search;
