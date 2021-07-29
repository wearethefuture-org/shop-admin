import { IActions } from '../../interfaces/actions';
import { IFeedbacksState } from '../../interfaces/IFeedback';
import {
  GET_FEEDBACKS_ERROR,
  GET_FEEDBACKS_REQUEST,
  GET_FEEDBACKS_SUCCESS,
  DELETE_FEEDBACK_ERROR,
  DELETE_FEEDBACK_REQUEST,
  DELETE_FEEDBACK_SUCCESS
} from '../types';

const initialState: IFeedbacksState = {
  loading: false,
  list: [],
  count: 0,
  page: 1,
  totalPages: 0,
  error: null,
};

const feedbacks = (state = initialState, { type, data }: IActions) => {
  switch (type) {
    case GET_FEEDBACKS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_FEEDBACKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: data.data,
        count: data.count,
        page: data.page,
        totalPages: data.totalPages,
      };
    }

    case GET_FEEDBACKS_ERROR: {
      return {
        ...state,
        loading: false,
        error: data,
      };
    }

    case DELETE_FEEDBACK_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    /*case DELETE_FEEDBACK_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: state.list.filter((feedback) => feedback.id !== data),
      };
    }*/

    case DELETE_FEEDBACK_ERROR: {
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

export default feedbacks;
