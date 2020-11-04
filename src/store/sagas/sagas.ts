import {takeEvery} from 'redux-saga/effects';

import { REQUEST_ADD_CATEGORIES, REQUEST_CATEGORIES } from '../types';
import {fetchCategoryWorker, addCategoryWorker} from '../sagas/categories.saga';
import { SagaIterator } from 'redux-saga';


export function* sagaWatcher (): SagaIterator {
   yield takeEvery(REQUEST_CATEGORIES, fetchCategoryWorker);
   yield takeEvery(REQUEST_ADD_CATEGORIES, addCategoryWorker);
}
