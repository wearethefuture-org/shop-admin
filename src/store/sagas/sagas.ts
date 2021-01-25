import { takeEvery } from 'redux-saga/effects';
import { REQUEST_CATEGORIES, REQUEST_ADD_CATEGORIES, REQUEST_PRODUCTS } from '../types';
import { fetchCategoryWorker, addCategoryWorker } from '../sagas/categories.saga';
import productsWorker from '../sagas/products.saga';
import { SagaIterator } from 'redux-saga';

export function* sagaCategoriesWatcher(): SagaIterator {
  yield takeEvery(REQUEST_CATEGORIES, fetchCategoryWorker);
  yield takeEvery(REQUEST_ADD_CATEGORIES, addCategoryWorker);
}

export function* sagaProductsWatcher(): SagaIterator {
  yield takeEvery(REQUEST_PRODUCTS, productsWorker);
}
