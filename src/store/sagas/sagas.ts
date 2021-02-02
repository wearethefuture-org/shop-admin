import { all, fork, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import {
  REQUEST_CATEGORIES,
  REQUEST_ADD_CATEGORIES,
  REQUEST_PRODUCTS,
  REQUEST_PRODUCT_BY_ID,
  REQUEST_DELETE_PRODUCT,
  REQUEST_ADD_PRODUCT,
  REQUEST_UPDATE_PRODUCT,
  REQUEST_SETTINGS,
  REQUEST_UPDATE_SETTINGS,
} from '../types';
import { fetchCategoryWorker, addCategoryWorker } from '../sagas/categories.saga';
import {
  fetchProductWorker,
  fetchProductByIdWorker,
  fetchDeleteProductWorker,
  fetchAddProductWorker,
  fetchUpdateProductWorker,
} from '../sagas/products.saga';
import { fetchSettingsWorker, updateSettingsWorker } from './settings.saga';

export function* sagaCategoriesWatcher(): SagaIterator {
  yield takeEvery(REQUEST_CATEGORIES, fetchCategoryWorker);
  yield takeEvery(REQUEST_ADD_CATEGORIES, addCategoryWorker);
}

export function* sagaProductsWatcher(): SagaIterator {
  yield takeEvery(REQUEST_PRODUCTS, fetchProductWorker);
  yield takeEvery(REQUEST_PRODUCT_BY_ID, fetchProductByIdWorker);
  yield takeEvery(REQUEST_DELETE_PRODUCT, fetchDeleteProductWorker);
  yield takeEvery(REQUEST_ADD_PRODUCT, fetchAddProductWorker);
  yield takeEvery(REQUEST_UPDATE_PRODUCT, fetchUpdateProductWorker);
}

// Settings
function* sagaSettingsWatcher(): SagaIterator {
  yield takeEvery(REQUEST_SETTINGS, fetchSettingsWorker);
  yield takeEvery(REQUEST_UPDATE_SETTINGS, updateSettingsWorker);
}

// RootSaga
export default function* rootSaga(): SagaIterator {
  yield all([fork(sagaCategoriesWatcher), fork(sagaProductsWatcher), fork(sagaSettingsWatcher)]);
}
