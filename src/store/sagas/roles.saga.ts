import { call, put } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';

import { getCommentsError } from '../actions/comments.actions';
import { failSnackBar } from '../actions/snackbar.actions';
import { getRolesSuccess } from '../actions/roles.actions';
import { apiGetRoles } from './services/roles.service';

export function* getRolesWorker(): SagaIterator {
  try {
    const roles = yield call(apiGetRoles);
    yield put(getRolesSuccess(roles));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getCommentsError(error.message));
  }
}
