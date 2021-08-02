import { call, put } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import { IActions } from '../../interfaces/actions';

import {
  deleteFeedbackError,
  deleteFeedbackSuccess,
  getFeedbacksError,
  getFeedbacksSuccess,
} from '../actions/feedbacks.actions';
import { failSnackBar } from '../actions/snackbar.actions';
import { apiDeleteFeedback, apiGetFeedbacks } from './services/feedbacks.service';

export function* getFeedbacksWorker({ data: { page, limit } }: IActions): SagaIterator {
  try {
    const feedbacks = yield call(apiGetFeedbacks, page, limit);
    yield put(getFeedbacksSuccess(feedbacks));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getFeedbacksError(error.message));
  }
}

export function* deleteFeedbackWorker({ data: id }: IActions): SagaIterator {
  try {
    yield call(apiDeleteFeedback, id);
    yield put(deleteFeedbackSuccess(id));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(deleteFeedbackError(error.message));
  }
}
