import { call, put } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import { IActions } from '../../interfaces/actions';

import {
  deleteCommentError,
  deleteCommentSuccess,
  getCommentsError,
  getCommentsSuccess,
} from '../actions/comments.actions';
import { failSnackBar } from '../actions/snackbar.actions';
import { apiDeleteComment, apiGetComments } from './services/comments.service';

export function* getCommentsWorker({ data: { page, limit } }: IActions): SagaIterator {
  try {
    const comments = yield call(apiGetComments, page, limit);
    yield put(getCommentsSuccess(comments));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getCommentsError(error.message));
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
