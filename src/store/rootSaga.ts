import { all, fork, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import {
  ADD_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCTS_REQUEST,
  REQUEST_ADD_CATEGORIES,
  REQUEST_CATEGORIES,
  REQUEST_SETTINGS,
  REQUEST_UPDATE_SETTINGS,
  UPDATE_PRODUCT_REQUEST,
  UPLOAD_MAIN_IMG_REQUEST,
  GET_CATEGORY_BY_ID_REQUEST,
  UPDATE_CATEGORY_REQUEST,
  REQUEST_SLIDES,
  REQUEST_UPDATE_SLIDES,
  REQUEST_ADD_SLIDES,
  REQUEST_DELETE_SLIDES,
  REQUEST_UPDATE_SLIDE_VISIBILITY,
  GET_ORDERS_REQUEST,
  GET_ORDER_BY_ID_REQUEST,
  UPDATE_ORDER_QUANTITY_REQUEST,
  UPDATE_ORDER_STATUS_REQUEST,
  GET_COMMENTS_REQUEST,
  DELETE_COMMENT_REQUEST,
} from './types';
import {
  fetchCategoryWorker,
  addCategoryWorker,
  getCategoryByIdWorker,
  updateCategoryWorker,
} from './sagas/categories.saga';
import { fetchSettingsWorker, updateSettingsWorker } from './sagas/settings.saga';
import {
  addProductWorker,
  deleteProductWorker,
  getProductByIdWorker,
  getProductsWorker,
  updateProductWorker,
  uploadMainImgWorker,
} from './sagas/products.saga';
import {
  addSlideWorker,
  fetchSlideWorker,
  deleteSlideWorker,
  updateSlideVisibilityWorker,
  updateSlideWorker } from './sagas/slides.saga';
import {
  getOrdersWorker,
  getOrdersByIdWorker,
  updateOrderQuantityWorker,
  updateOrderStatusWorker
} from './sagas/orders.saga';
import { deleteCommentWorker, getCommentsWorker } from './sagas/comments.saga';

// Categories
export function* sagaCategoriesWatcher(): SagaIterator {
  yield takeEvery(REQUEST_CATEGORIES, fetchCategoryWorker);
  yield takeEvery(REQUEST_ADD_CATEGORIES, addCategoryWorker);
  yield takeEvery(GET_CATEGORY_BY_ID_REQUEST, getCategoryByIdWorker);
  yield takeEvery(UPDATE_CATEGORY_REQUEST, updateCategoryWorker);
}

// Products
export function* sagaProductsWatcher(): SagaIterator {
  yield takeEvery(GET_PRODUCTS_REQUEST, getProductsWorker);
  yield takeEvery(GET_PRODUCT_BY_ID_REQUEST, getProductByIdWorker);
  yield takeEvery(ADD_PRODUCT_REQUEST, addProductWorker);
  yield takeEvery(UPLOAD_MAIN_IMG_REQUEST, uploadMainImgWorker);
  yield takeEvery(UPDATE_PRODUCT_REQUEST, updateProductWorker);
  yield takeEvery(DELETE_PRODUCT_REQUEST, deleteProductWorker);
}

// Settings
function* sagaSettingsWatcher(): SagaIterator {
  yield takeEvery(REQUEST_SETTINGS, fetchSettingsWorker);
  yield takeEvery(REQUEST_UPDATE_SETTINGS, updateSettingsWorker);
}

// Slides
function* sagaSlidesWatcher(): SagaIterator {
  yield takeEvery(REQUEST_ADD_SLIDES, addSlideWorker);
  yield takeEvery(REQUEST_SLIDES, fetchSlideWorker);
  yield takeEvery(REQUEST_UPDATE_SLIDES, updateSlideWorker);
  yield takeEvery(REQUEST_DELETE_SLIDES, deleteSlideWorker);
  yield takeEvery(REQUEST_UPDATE_SLIDE_VISIBILITY, updateSlideVisibilityWorker);
}

// Comments
export function* sagaCommentsWatcher(): SagaIterator {
  yield takeEvery(GET_COMMENTS_REQUEST, getCommentsWorker);
  yield takeEvery(DELETE_COMMENT_REQUEST, deleteCommentWorker);
}

//Orders
function* sagaOrdersWatcher(): SagaIterator {
  yield takeEvery(GET_ORDERS_REQUEST, getOrdersWorker);
  yield takeEvery(GET_ORDER_BY_ID_REQUEST, getOrdersByIdWorker);
  yield takeEvery(UPDATE_ORDER_QUANTITY_REQUEST, updateOrderQuantityWorker);
  yield takeEvery(UPDATE_ORDER_STATUS_REQUEST, updateOrderStatusWorker);
}

// RootSaga
export default function* rootSaga(): SagaIterator {
  yield all([
    fork(sagaCategoriesWatcher),
    fork(sagaProductsWatcher),
    fork(sagaSettingsWatcher),
    fork(sagaSlidesWatcher),
    fork(sagaOrdersWatcher),
    fork(sagaCommentsWatcher),
  ]);
}
