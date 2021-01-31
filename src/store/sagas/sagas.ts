import { takeEvery } from "redux-saga/effects";
import {
  REQUEST_CATEGORIES,
  REQUEST_ADD_CATEGORIES,
  REQUEST_PRODUCTS,
  REQUEST_SETTINGS,
  REQUEST_UPDATE_SETTINGS,
} from "../types";
import {
  fetchCategoryWorker,
  addCategoryWorker,
} from "../sagas/categories.saga";
import productsWorker from "../sagas/products.saga";
import { SagaIterator } from "redux-saga";
import { fetchSettingsWorker, updateSettingsWorker } from "./settings.saga";

export function* sagaCategoriesWatcher(): SagaIterator {
  yield takeEvery(REQUEST_CATEGORIES, fetchCategoryWorker);
  yield takeEvery(REQUEST_ADD_CATEGORIES, addCategoryWorker);
}

export function* sagaProductsWatcher(): SagaIterator {
  yield takeEvery(REQUEST_PRODUCTS, productsWorker);
}

// Settings
export function* sagaSettingsWatcher(): SagaIterator {
  yield takeEvery(REQUEST_SETTINGS, fetchSettingsWorker);
  yield takeEvery(REQUEST_UPDATE_SETTINGS, updateSettingsWorker);
}
