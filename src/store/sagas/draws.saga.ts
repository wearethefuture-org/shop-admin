import { call, put } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import { IActions } from '../../interfaces/actions';

import {
  addDrawError,
  addDrawSuccess,
  deleteDrawError,
  deleteDrawSuccess,
  getDrawsError,
  getDrawsRequest,
  getDrawsSuccess,
  updateDrawError,
  updateDrawSuccess,
} from '../actions/draws.actions';
import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';
import { apiAddDraw, apiDeleteDraw, apiGetDraws, apiUpdateDraw } from './services/draws.service';

export function* addDrawWorker({ data: { drawValues } }: IActions): SagaIterator {
  try {
    const draw = yield call(apiAddDraw, drawValues);
    yield put(addDrawSuccess(draw));
    yield put(successSnackBar());
    yield put(getDrawsRequest(1, 10));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(addDrawError(error.message));
  }
}

export function* getDrawsWorker({ data: { page, limit } }: IActions): SagaIterator {
  try {
    const draws = yield call(apiGetDraws, page, limit);
    yield put(getDrawsSuccess(draws));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getDrawsError(error.message));
  }
}

export function* updateDrawWorker({ data: { id, drawValues } }: IActions): SagaIterator {
  try {
    const draw = yield call(apiUpdateDraw, id, drawValues);
    yield put(updateDrawSuccess(draw));
    yield put(successSnackBar());
    yield put(getDrawsRequest(1, 10));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(updateDrawError(error.message));
  }
}

export function* deleteDrawWorker({ data: id }: IActions): SagaIterator {
  try {
    yield call(apiDeleteDraw, id);
    yield put(deleteDrawSuccess(id));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(deleteDrawError(error.message));
  }
}
