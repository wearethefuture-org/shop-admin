import { all, fork, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import {
  ADD_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCTS_BY_QUERY_REQUEST,
  GET_PRODUCTS_REQUEST,
  GET_TREE_CATEGORIES_REQUEST,
  ADD_TREE_CATEGORY,
  DELETE_TREE_CATEGORY,
  UPDATE_TREE_CATEGORY_REQUEST,
  GET_TREE_CATEGORIES_BY_ID_REQUEST,
  REQUEST_SETTINGS,
  REQUEST_UPDATE_SETTINGS,
  UPDATE_PRODUCT_REQUEST,
  UPLOAD_MAIN_IMG_REQUEST,
  REQUEST_SLIDES,
  REQUEST_UPDATE_SLIDES,
  REQUEST_ADD_SLIDES,
  REQUEST_DELETE_SLIDES,
  GET_ORDERS_REQUEST,
  GET_ORDER_BY_ID_REQUEST,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_STATUS_REQUEST,
  GET_COMMENTS_REQUEST,
  DELETE_COMMENT_REQUEST,
  GET_FEEDBACKS_REQUEST,
  DELETE_FEEDBACK_REQUEST,
  REQUEST_UPDATE_SLIDE_VISIBILITY,
  GET_USERS_REQUEST,
  ADD_USER_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  USER_SIGN_IN_FETCHING,
  USER_SIGN_OUT,
  USER_FETCH_REQUEST,
  UPDATE_AVAILABILITY_PRODUCT_REQUEST,
  GET_ROLES_REQUEST,
  DISABLE_PRODUCT_REQUEST,
  GET_SEARCH_ITEMS_REQUEST,
  GET_SLIDER_ANIMATIONS_REQUEST,
  REQUEST_CHANGE_ACTIVE_SLIDER_ANIMATION,
  GET_INVOICES_LIST_REQUEST,
  REMOVE_INVOICE_REQUEST,
} from './types';

import {
  fetchTreeCategoryWorker,
  addTreeCategoryWorker,
  deleteTreeCategoryWorker,
  updateTreeCategoryWorker,
  getTreeCategoriesByIdWorker,
} from './sagas/treeCategories.saga';

import { fetchSettingsWorker, updateSettingsWorker } from './sagas/settings.saga';
import {
  addProductWorker,
  deleteProductWorker,
  getProductByIdWorker,
  getProductsByQueryWorker,
  getProductsWorker,
  updateProductWorker,
  uploadMainImgWorker,
  updateAvailabilityProductWorker,
  disableProductWorker,
} from './sagas/products.saga';
import {
  addSlideWorker,
  fetchSlideWorker,
  deleteSlideWorker,
  updateSlideVisibilityWorker,
  updateSlideWorker,
} from './sagas/slides.saga';
import {
  getOrdersWorker,
  getOrdersByIdWorker,
  updateOrderWorker,
  updateOrderStatusWorker,
} from './sagas/orders.saga';
import { deleteCommentWorker, getCommentsWorker } from './sagas/comments.saga';
import { deleteFeedbackWorker, getFeedbacksWorker } from './sagas/feedbacks.saga';
import {
  addUserWorker,
  deleteUserWorker,
  getUsersWorker,
  updateUserWorker,
} from './sagas/users.saga';
import { fetchUser, sigInUser, signOutUser } from './sagas/user.saga';
import { getRolesWorker } from './sagas/roles.saga';
import { getSearchItemsWorker } from './sagas/search.saga';
import {
  changeActiveSliderAnimationWorker,
  getActiveSliderAnimationWorker,
  getSliderAnimationsWorker,
} from './sagas/sliderAnimations.saga';
import { getInvoicesListWorker, removeInvoiceWorker } from './sagas/invoice.saga';

export function* sagaTreeCategoriesWatcher(): SagaIterator {
  yield takeEvery(GET_TREE_CATEGORIES_REQUEST, fetchTreeCategoryWorker);
  yield takeEvery(ADD_TREE_CATEGORY, addTreeCategoryWorker);
  yield takeEvery(DELETE_TREE_CATEGORY, deleteTreeCategoryWorker);
  yield takeEvery(UPDATE_TREE_CATEGORY_REQUEST, updateTreeCategoryWorker);
  yield takeEvery(GET_TREE_CATEGORIES_BY_ID_REQUEST, getTreeCategoriesByIdWorker);
}

export function* sagaProductsWatcher(): SagaIterator {
  yield takeEvery(GET_PRODUCTS_REQUEST, getProductsWorker);
  yield takeEvery(GET_PRODUCT_BY_ID_REQUEST, getProductByIdWorker);
  yield takeEvery(GET_PRODUCTS_BY_QUERY_REQUEST, getProductsByQueryWorker);
  yield takeEvery(ADD_PRODUCT_REQUEST, addProductWorker);
  yield takeEvery(UPLOAD_MAIN_IMG_REQUEST, uploadMainImgWorker);
  yield takeEvery(UPDATE_PRODUCT_REQUEST, updateProductWorker);
  yield takeEvery(DELETE_PRODUCT_REQUEST, deleteProductWorker);
  yield takeEvery(UPDATE_AVAILABILITY_PRODUCT_REQUEST, updateAvailabilityProductWorker);
  yield takeEvery(DISABLE_PRODUCT_REQUEST, disableProductWorker);
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

// Feedbacks
export function* sagaFeedbacksWatcher(): SagaIterator {
  yield takeEvery(GET_FEEDBACKS_REQUEST, getFeedbacksWorker);
  yield takeEvery(DELETE_FEEDBACK_REQUEST, deleteFeedbackWorker);
}

//Orders
function* sagaOrdersWatcher(): SagaIterator {
  yield takeEvery(GET_ORDERS_REQUEST, getOrdersWorker);
  yield takeEvery(GET_ORDER_BY_ID_REQUEST, getOrdersByIdWorker);
  yield takeEvery(UPDATE_ORDER_REQUEST, updateOrderWorker);
  yield takeEvery(UPDATE_ORDER_STATUS_REQUEST, updateOrderStatusWorker);
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

// Roles
export function* getRolesWatcher(): SagaIterator {
  yield takeEvery(GET_ROLES_REQUEST, getRolesWorker);
}

// Search
export function* sagaSearchWatcher(): SagaIterator {
  yield takeEvery(GET_SEARCH_ITEMS_REQUEST, getSearchItemsWorker);
}

export function* sagaSliderAnimationsWatcher(): SagaIterator {
  yield takeEvery(GET_SLIDER_ANIMATIONS_REQUEST, getSliderAnimationsWorker);
  yield takeEvery(GET_SLIDER_ANIMATIONS_REQUEST, getActiveSliderAnimationWorker);
  yield takeEvery(REQUEST_CHANGE_ACTIVE_SLIDER_ANIMATION, changeActiveSliderAnimationWorker);
}

// Invoice
export function* sagaInvoiceWatcher(): SagaIterator {
  yield takeEvery(GET_INVOICES_LIST_REQUEST, getInvoicesListWorker);
  yield takeEvery(REMOVE_INVOICE_REQUEST, removeInvoiceWorker);
}

// RootSaga
export default function* rootSaga(): SagaIterator {
  yield all([
    fork(sagaTreeCategoriesWatcher),
    fork(sagaProductsWatcher),
    fork(sagaSettingsWatcher),
    fork(sagaSlidesWatcher),
    fork(sagaOrdersWatcher),
    fork(sagaCommentsWatcher),
    fork(sagaFeedbacksWatcher),
    fork(sagaUsersWatcher),
    fork(sagaUserWatcher),
    fork(getRolesWatcher),
    fork(sagaSearchWatcher),
    fork(sagaSliderAnimationsWatcher),
    fork(sagaInvoiceWatcher),
  ]);
}
