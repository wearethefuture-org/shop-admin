import { call, put } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import { IActions } from '../../interfaces/actions';

import {
  deleteCommentError,
  deleteCommentSuccess,
  getCommentsByRangeError,
  getCommentsByRangeSuccess,
  getCommentsError,
  getCommentsSuccess,
} from '../actions/comments.actions';
import { failSnackBar } from '../actions/snackbar.actions';
import { apiDeleteComment, apiGetByRangeComments, apiGetComments } from './services/comments.service';

export function* getCommentsWorker({ data: { page, limit, sort, sortDirect } }: IActions): SagaIterator {
  try {
    const comments = yield call(apiGetComments, page, limit, sort, sortDirect);
    yield put(getCommentsSuccess(comments));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getCommentsError(error.message));
  }
}

export function* getCommentsByDateRangeWorker({ data: datesArray }: IActions): SagaIterator {
  try {
    const comments = yield call(apiGetByRangeComments, datesArray);
    yield put(getCommentsByRangeSuccess(comments));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getCommentsByRangeError(error.message));
  }
}

export function* deleteCommentWorker({ data: id }: IActions): SagaIterator {
  try {
    yield call(apiDeleteComment, id);
    yield put(deleteCommentSuccess(id));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(deleteCommentError(error.message));
  }
}
