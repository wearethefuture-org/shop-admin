import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { fetchedSettings, updateSettings } from './services/settings.service';
import { failSnackBar, loadSettings, successSnackBar, updateSetting } from '../actions';
import { IActions } from '../../interfaces/actions';

export function* fetchSettingsWorker(): SagaIterator {
  try {
    const settingsData = yield call(fetchedSettings);
    yield put(loadSettings(settingsData));
  } catch (error) {
    yield put(failSnackBar(error.message));
  }
}

export function* updateSettingsWorker({ data }: IActions): SagaIterator {
  try {
    const updatedSettings = yield call(updateSettings, data);
    yield put(updateSetting(updatedSettings));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
  }
}
