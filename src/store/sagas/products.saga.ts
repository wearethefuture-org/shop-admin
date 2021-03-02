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
  apiDeleteImg,
  apiGetProductsInCart,
  apiDeleteChar,
  apiUpdateProductCharValues,
  apiAddProductCharValues,
} from './services/products.service';
import {
  addProductError,
  addProductSuccess,
  deleteImageError,
  deleteImageSuccess,
  deleteProductError,
  deleteProductSuccess,
  getProductByIdError,
  getProductByIdSuccess,
  getProductsError,
  getProductsSuccess,
  updateProductError,
  updateProductSuccess,
  uploadMainImgError,
  uploadMainImgSuccess,
} from '../actions/products.actions';
import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';

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

export function* deleteImgWorker({ data: { imgName, id } }: IActions): SagaIterator {
  try {
    yield call(apiDeleteImg, imgName);
    const product = yield call(apiGetProductById, id);

    yield put(deleteImageSuccess(product));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(deleteImageError(error.message));
  }
}

export function* updateProductWorker({
  data: {
    id,
    productValues,
    characteristicValues: { charsToAdd, charsToEdit, charsToDelete },
  },
}: IActions): SagaIterator<void> {
  try {
    const { name, price, description, categoryName, key, files } = productValues;
    const editedProduct = yield call(apiUpdateProduct, {
      id,
      name,
      price,
      description,
      categoryName,
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

    const updatedProduct = yield call(apiGetProductById, editedProduct.id);

    yield put(updateProductSuccess(updatedProduct));
    yield put(successSnackBar());
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(updateProductError(error.message));
  }
}

export function* deleteProductWorker({ data: id }: IActions): SagaIterator {
  try {
    const products = yield call(apiGetProductsInCart);
    const productsInCartIds = products.length && products.map((product) => product.productId);

    if (productsInCartIds.length && productsInCartIds.includes(id)) {
      yield put(failSnackBar('Продукт знаходиться у кошику та не може бути видалений'));
    } else {
      yield call(apiDeleteProduct, id);
      yield put(deleteProductSuccess(id));
      yield put(successSnackBar());
    }
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(deleteProductError(error.message));
  }
}
