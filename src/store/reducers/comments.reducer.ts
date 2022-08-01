import { IActions } from '../../interfaces/actions';
import { ICommentsState } from '../../interfaces/IComment';
import {
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  GET_COMMENTS_BY_RANGE_REQUEST,
  GET_COMMENTS_BY_RANGE_SUCCESS,
  GET_COMMENTS_BY_RANGE_ERROR,
  GET_COMMENTS_ERROR,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
} from '../types';

const initialState: ICommentsState = {
  loading: false,
  list: [],
  rangeComments: null,
  count: 0,
  page: 1,
  totalPages: 0,
  error: null,
};

const comments = (state = initialState, { type, data }: IActions) => {
  switch (type) {
    case GET_COMMENTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_COMMENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: data.data,
        count: data.count,
        page: data.page,
        totalPages: data.totalPages,
      };
    }

    case GET_COMMENTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    case DELETE_COMMENT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_COMMENTS_BY_RANGE_REQUEST: {
      return {
        ...state,
        rangeComments: null,
        loading: true,
        error: null,
      };
    }

    case GET_COMMENTS_BY_RANGE_SUCCESS: {
      return {
        ...state,
        rangeComments: data,
        loading: false,
      };
    }

    case GET_COMMENTS_BY_RANGE_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: state.list.filter((comment) => comment.id !== data),
      };
    }

    case DELETE_COMMENT_ERROR: {
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

export default comments;
