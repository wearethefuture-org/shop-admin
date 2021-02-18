import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IActions } from '../../interfaces/actions';
import {
  apiGetProducts,
  apiGetProductById,
  apiAddProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  apiUploadMainImg,
  apiUploadImages,
} from './services/products.service';
import {
  addProductError,
  addProductSuccess,
  deleteProductError,
  deleteProductSuccess,
  failSnackBar,
  getProductByIdError,
  getProductByIdSuccess,
  getProductsError,
  getProductsSuccess,
  successSnackBar,
  updateProductError,
  updateProductSuccess,
  uploadMainImgError,
  uploadMainImgSuccess,
} from '../actions';

export function* getProductsWorker(): SagaIterator {
  try {
    const products = yield call(apiGetProducts);
    yield put(getProductsSuccess(products));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getProductsError(error.message));
  }
}

export function* getProductByIdWorker({ data: id }: IActions): SagaIterator {
  try {
    const product = yield call(apiGetProductById, id);
    yield put(getProductByIdSuccess(product));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getProductByIdError(error.message));
  }
}

export function* addProductWorker({ data }: IActions): SagaIterator {
  try {
    const { name, price, description, categoryName, key, files } = data;
    const product = yield call(apiAddProduct, { name, price, description, categoryName, key });

    if (product && files) {
      files.append('productId', product.id);
      yield call(apiUploadImages, files);
    }

    const updatedProduct = yield call(apiGetProductById, product.id);

    yield put(addProductSuccess(updatedProduct));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(addProductError(error.message));
  }
}

export function* uploadMainImgWorker({ data }: IActions): SagaIterator {
  try {
    const product = yield call(apiUploadMainImg, data);

    yield put(uploadMainImgSuccess(product));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(uploadMainImgError(error.message));
  }
}

export function* updateProductWorker({ data }: IActions): SagaIterator {
  try {
    const product = yield call(apiUpdateProduct, data);
    yield put(updateProductSuccess(product));

    // yield call(apiUploadImage, data);
    yield call(apiGetProductById, product.id);
    yield put(getProductByIdSuccess(product));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(updateProductError(error.message));
  }
}

export function* deleteProductWorker({ data }: IActions): SagaIterator {
  try {
    const product = yield call(apiDeleteProduct, data);
    yield put(deleteProductSuccess(product));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(deleteProductError(error.message));
  }
}
