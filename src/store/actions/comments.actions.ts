import { IActions } from '../../interfaces/actions';
import { IComment } from '../../interfaces/IComment';

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

// get all
export const getCommentsRequest = (page = 1, limit = 10, sort = 'id', sortDirect = 'asc'): IActions => ({
  type: GET_COMMENTS_REQUEST,
  data: { page, limit, sort, sortDirect },
});

export const getCommentsSuccess = (products: IComment[]): IActions => ({
  type: GET_COMMENTS_SUCCESS,
  data: products,
});

export const getCommentsError = (message: string): IActions => ({
  type: GET_COMMENTS_ERROR,
  data: message,
});

// get comments by date range
export const getCommentsByRangeRequest = (datesArray: string[]): IActions => ({
  type: GET_COMMENTS_BY_RANGE_REQUEST,
  data: datesArray,
});

export const getCommentsByRangeSuccess = (comments: any): IActions => ({
  type: GET_COMMENTS_BY_RANGE_SUCCESS,
  data: comments,
});

export const getCommentsByRangeError = (message: string): IActions => ({
  type: GET_COMMENTS_BY_RANGE_ERROR,
  data: message,
});

// delete
export const deleteCommentRequest = (id: number): IActions => ({
  type: DELETE_COMMENT_REQUEST,
  data: id,
});

export const deleteCommentSuccess = (id: number): IActions => ({
  type: DELETE_COMMENT_SUCCESS,
  data: id,
});

export const deleteCommentError = (message: string): IActions => ({
  type: DELETE_COMMENT_ERROR,
  data: message,
});
