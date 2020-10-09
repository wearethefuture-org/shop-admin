import {takeEvery, put, call} from 'redux-saga/effects';
import { loadCategories } from './actions';
import { REQUEST_CATEGORIES } from './types';


export function* sagaWatcher () {
   yield takeEvery(REQUEST_CATEGORIES, sagaWorker);
}

function* sagaWorker () {
   const categoriesData = yield call(fetchedCategories);
   yield put(loadCategories(categoriesData));
}

async function fetchedCategories () {
   const response = await fetch("http://localhost:4000/category");
   return await response.json();
}
