import { IActions } from '../../interfaces/actions';
import { IFeedback } from '../../interfaces/IFeedback';

import {
  GET_FEEDBACKS_REQUEST,
  GET_FEEDBACKS_SUCCESS,
  GET_FEEDBACKS_ERROR,
  DELETE_FEEDBACK_ERROR,
  DELETE_FEEDBACK_REQUEST,
  DELETE_FEEDBACK_SUCCESS,
} from '../types';

export const getFeedbacksRequest = (page: number, limit: number): IActions => ({
  type: GET_FEEDBACKS_REQUEST,
  data: { page, limit },
});

export const getFeedbacksSuccess = (users: IFeedback[]): IActions => ({
  type: GET_FEEDBACKS_SUCCESS,
  data: users,
});

export const getFeedbacksError = (message: string): IActions => ({
  type: GET_FEEDBACKS_ERROR,
  data: message,
});

export const deleteFeedbackRequest = (id: number): IActions => ({
  type: DELETE_FEEDBACK_REQUEST,
  data: id,
});

export const deleteFeedbackSuccess = (id: number): IActions => ({
  type: DELETE_FEEDBACK_SUCCESS,
  data: id,
});

export const deleteFeedbackError = (message: string): IActions => ({
  type: DELETE_FEEDBACK_ERROR,
  data: message,
});
