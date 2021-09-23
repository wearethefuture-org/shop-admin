import { call, put } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import { IActions } from '../../interfaces/actions';
import { getSearchItemsError, getSearchItemsSuccess } from '../actions/search.action';

import { failSnackBar } from '../actions/snackbar.actions';
import { apiGetSearchItems } from './services/search.service';

export function* getSearchItemsWorker({ data: { fields } }: IActions): SagaIterator {
  try {
    const items = yield call(apiGetSearchItems, fields);
    yield put(getSearchItemsSuccess(items));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getSearchItemsError(error.message));
  }
}
