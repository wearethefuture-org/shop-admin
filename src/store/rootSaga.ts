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
  GET_COMMENTS_REQUEST,
  DELETE_COMMENT_REQUEST,
  REQUEST_UPDATE_SLIDE_VISIBILITY,
  GET_USERS_REQUEST,
  ADD_USER_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  USER_SIGN_IN_FETCHING,
  USER_SIGN_OUT,
  USER_FETCH_REQUEST,
  REQUEST_MAIN_CATEGORIES,
  REQUEST_ADD_MAIN_CATEGORIES,
  GET_MAIN_CATEGORY_BY_ID_REQUEST,
  UPDATE_MAIN_CATEGORY_REQUEST,
  UPDATE_AVAILABILITY_PRODUCT,
} from './types';

import {
  fetchMainCategoryWorker,
  addMainCategoryWorker,
  getMainCategoryByIdWorker,
  updateMainCategoryWorker,
} from './sagas/mainCategories.saga';

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
  updateAvailabilityProductWorker,
} from './sagas/products.saga';
import {
  addSlideWorker,
  fetchSlideWorker,
  deleteSlideWorker,
  updateSlideVisibilityWorker,
  updateSlideWorker } from './sagas/slides.saga';
import { deleteCommentWorker, getCommentsWorker } from './sagas/comments.saga';
import {
  addUserWorker,
  deleteUserWorker,
  getUsersWorker,
  updateUserWorker,
} from './sagas/users.saga';
import { fetchUser, sigInUser, signOutUser } from './sagas/user.saga';

export function* sagaMainCategoriesWatcher(): SagaIterator {
  yield takeEvery(REQUEST_MAIN_CATEGORIES, fetchMainCategoryWorker);
  yield takeEvery(REQUEST_ADD_MAIN_CATEGORIES, addMainCategoryWorker);
  yield takeEvery(GET_MAIN_CATEGORY_BY_ID_REQUEST, getMainCategoryByIdWorker);
  yield takeEvery(UPDATE_MAIN_CATEGORY_REQUEST, updateMainCategoryWorker);
}

export function* sagaCategoriesWatcher(): SagaIterator {
  yield takeEvery(REQUEST_CATEGORIES, fetchCategoryWorker);
  yield takeEvery(REQUEST_ADD_CATEGORIES, addCategoryWorker);
  yield takeEvery(GET_CATEGORY_BY_ID_REQUEST, getCategoryByIdWorker);
  yield takeEvery(UPDATE_CATEGORY_REQUEST, updateCategoryWorker);
}

export function* sagaProductsWatcher(): SagaIterator {
  yield takeEvery(GET_PRODUCTS_REQUEST, getProductsWorker);
  yield takeEvery(GET_PRODUCT_BY_ID_REQUEST, getProductByIdWorker);
  yield takeEvery(ADD_PRODUCT_REQUEST, addProductWorker);
  yield takeEvery(UPLOAD_MAIN_IMG_REQUEST, uploadMainImgWorker);
  yield takeEvery(UPDATE_PRODUCT_REQUEST, updateProductWorker);
  yield takeEvery(DELETE_PRODUCT_REQUEST, deleteProductWorker);
  yield takeEvery(UPDATE_AVAILABILITY_PRODUCT, updateAvailabilityProductWorker);
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

export function* sagaUsersWatcher(): SagaIterator {
  yield takeEvery(GET_USERS_REQUEST, getUsersWorker);
  yield takeEvery(ADD_USER_REQUEST, addUserWorker);
  yield takeEvery(UPDATE_USER_REQUEST, updateUserWorker);
  yield takeEvery(DELETE_USER_REQUEST, deleteUserWorker);
}

export function* sagaUserWatcher(): SagaIterator {
  yield takeEvery(USER_SIGN_IN_FETCHING, sigInUser);
  yield takeEvery(USER_SIGN_OUT, signOutUser);
  yield takeEvery(USER_FETCH_REQUEST, fetchUser);
}

// RootSaga
export default function* rootSaga(): SagaIterator {
  yield all([
    fork(sagaCategoriesWatcher),
    fork(sagaMainCategoriesWatcher),
    fork(sagaProductsWatcher),
    fork(sagaSettingsWatcher),
    fork(sagaSlidesWatcher),
    fork(sagaCommentsWatcher),
    fork(sagaUsersWatcher),
    fork(sagaUserWatcher),
  ]);
}
