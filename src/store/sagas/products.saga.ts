import { put, call, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IActions } from '../../interfaces/actions';
import {
  apiGetProducts,
  apiGetProductById,
  apiGetProductsByQuery,
  apiAddProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  apiUploadMainImg,
  apiUploadImages,
  apiDeleteImg,
  apiDeleteChar,
  apiUpdateProductCharValues,
  apiAddProductCharValues,
  apiUpdateAvailabilityProduct,
  disableProduct,
} from './services/products.service';
import {
  addProductError,
  addProductSuccess,
  deleteProductError,
  deleteProductSuccess,
  getProductByIdError,
  getProductByIdSuccess,
  getProductsByQueryError,
  getProductsByQuerySuccess,
  getProductsError,
  getProductsSuccess,
  updateProductError,
  updateProductSuccess,
  uploadMainImgError,
  uploadMainImgSuccess,
  updateAvailabilityProductError,
  updateAvailabilityProductSuccess,
  disableProductSuccess,
  disableProductError,
} from '../actions/products.actions';
import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';

export function* getProductsWorker({ data: { page, limit } }: IActions): SagaIterator {
  try {
    const products = yield call(apiGetProducts, page, limit);
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

export function* getProductsByQueryWorker({
  data: { searchQuery, page, limit },
}: IActions): SagaIterator {
  try {
    const products = yield call(apiGetProductsByQuery, searchQuery, page, limit);
    yield put(getProductsByQuerySuccess(products));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getProductsByQueryError(error.message));
  }
}

export function* addProductWorker({
  data: { productValues, characteristicValues },
}: IActions): SagaIterator {
  try {
    const { name, price, description, categoryName, key, files } = productValues;
    const product = yield call(apiAddProduct, { name, price, description, categoryName, key });

    if (product && files instanceof FormData) {
      files.append('productId', product.id);
      yield call(apiUploadImages, files);
    }

    if (product && characteristicValues) {
      yield call(apiAddProductCharValues, {
        productId: product.id,
        characteristicValues,
      });
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
    yield call(apiUploadMainImg, data);

    const updatedProduct = yield call(apiGetProductById, data.productId);

    yield put(uploadMainImgSuccess(updatedProduct));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(uploadMainImgError(error.message));
  }
}

export function* updateProductWorker({
  data: {
    id,
    categoryID,
    productValues,
    characteristicValues: { charsToAdd, charsToEdit, charsToDelete },
    imagesToDelete,
  },
}: IActions): SagaIterator<void> {
  try {
    const { name, price, description, key, files } = productValues;
    const editedProduct = yield call(apiUpdateProduct, {
      id,
      categoryID,
      name,
      price,
      description,
      key,
    });

    if (editedProduct && files instanceof FormData) {
      files.append('productId', editedProduct.id);
      yield call(apiUploadImages, files);
    }

    if (charsToAdd.length) {
      yield call(apiAddProductCharValues, {
        productId: id,
        characteristicValues: charsToAdd,
      });
    }

    if (charsToEdit.length) {
      yield call(apiUpdateProductCharValues, {
        productId: id,
        characteristicValues: charsToEdit,
      });
    }

    if (charsToDelete.length) {
      yield call(
        apiDeleteChar,
        { url: '/characteristics-values' },
        { characteristicValuesIds: charsToDelete }
      );
    }

    if (imagesToDelete.length) {
      yield all(imagesToDelete.map((img) => call(apiDeleteImg, img)));
    }

    const updatedProduct = yield call(apiGetProductById, editedProduct.id);

    yield put(updateProductSuccess(updatedProduct));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(updateProductError(error.message));
  }
}

export function* deleteProductWorker({ data: product }: IActions): SagaIterator {
  try {
    const charValues = product.characteristicValue.map((value) => value.id);
    
    if(charValues.length)
      yield call(
        apiDeleteChar,
        { url: '/characteristics-values' },
        { characteristicValuesIds: charValues }
      );

    yield call(apiDeleteProduct, product.id);
    yield put(deleteProductSuccess(product.id));
    yield put(successSnackBar());
    
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(deleteProductError(error.message));
  }
}

export function* updateAvailabilityProductWorker({ data }: IActions): SagaIterator {
  try {
    yield call(apiUpdateAvailabilityProduct, data);
    yield put(updateAvailabilityProductSuccess(data));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(updateAvailabilityProductError(error.message));
  }
}

export function* disableProductWorker({ data }: IActions): SagaIterator {
  try {
    const newProduct = yield call(disableProduct, data);
    yield put(disableProductSuccess(newProduct));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(disableProductError(error.message));
  }
}
