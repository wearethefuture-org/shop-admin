import { IActions } from '../../interfaces/actions';
import {
  DELETE_DRAW_ERROR,
  DELETE_DRAW_REQUEST,
  DELETE_DRAW_SUCCESS,
  GET_DRAWS_ERROR,
  GET_DRAWS_REQUEST,
  GET_DRAWS_SUCCESS,
} from '../types';
import { IDrawsState } from '../../interfaces/IDraw';

const initialState: IDrawsState = {
  loading: false,
  list: [],
  count: 0,
  page: 1,
  totalPages: 0,
  error: null,
};

const draws = (state = initialState, { type, data }: IActions) => {
  switch (type) {
    case GET_DRAWS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_DRAWS_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: data.data,
        count: data.count,
        page: data.page,
        totalPages: data.totalPages,
      };
    }

    case GET_DRAWS_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    case DELETE_DRAW_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case DELETE_DRAW_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: state.list.filter((feedback) => feedback.id !== data),
      };
    }

    case DELETE_DRAW_ERROR: {
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

export default draws;
