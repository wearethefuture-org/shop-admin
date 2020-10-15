import { put, call } from 'redux-saga/effects';

import { fetchedCategories } from './services/category.service';
import { loadCategories } from '../actions';

export default function* sagaWorker() {
   const categoriesData = yield call(fetchedCategories);
   yield put(loadCategories(categoriesData));
}