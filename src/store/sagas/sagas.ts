import {takeEvery} from 'redux-saga/effects';

import { REQUEST_CATEGORIES } from '../types';
import categoriesWorker from '../sagas/categories.saga';


export function* sagaWatcher () {
   yield takeEvery(REQUEST_CATEGORIES, categoriesWorker);
}
