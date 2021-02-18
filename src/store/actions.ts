import { IActions } from '../interfaces/actions';
import { ICategoryItem } from '../interfaces/category-Item';
import { IProductItem, IProductFormData } from '../interfaces/IProducts';
import { ISettingError, ISettingsItem } from '../interfaces/ISettings';
import { IUserItem } from '../interfaces/Users';
import {
  ADD_CATEGORY,
  LOAD_CATEGORIES,
  REQUEST_CATEGORIES,
  REQUEST_ADD_CATEGORIES,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_ERROR,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  LOAD_USERS,
  REQUEST_USERS,
  SWITCH_DARK_MODE,
  REQUEST_SETTINGS,
  LOAD_SETTINGS,
  REQUEST_UPDATE_SETTINGS,
  UPDATE_SETTINGS,
  SUCCESS_SNACKBAR,
  FAIL_SNACKBAR,
  CLOSE_SNACKBAR,
  UPLOAD_MAIN_IMG_REQUEST,
  UPLOAD_MAIN_IMG_SUCCESS,
  UPLOAD_MAIN_IMG_ERROR,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_ERROR,
} from './types';

export const loadCategories = (categories: ICategoryItem[]): IActions => ({
  type: LOAD_CATEGORIES,
  data: categories,
});
export const fetchCategories = (): IActions => ({ type: REQUEST_CATEGORIES });

export const fetchAddCategories = (name: string, key: string, description: string): IActions => ({
  type: REQUEST_ADD_CATEGORIES,
  data: { name, key, description },
});

export const addCategory = (category: ICategoryItem): IActions => ({
  type: ADD_CATEGORY,
  data: category,
});

// PRODUCTS
// get all
export const getProductsRequest = (): IActions => ({
  type: GET_PRODUCTS_REQUEST,
});

export const getProductsSuccess = (products: IProductItem[]): IActions => ({
  type: GET_PRODUCTS_SUCCESS,
  data: products,
});

export const getProductsError = (message: string): IActions => ({
  type: GET_PRODUCTS_ERROR,
  data: message,
});

// get one by id
export const getProductByIdRequest = (id: number): IActions => ({
  type: GET_PRODUCT_BY_ID_REQUEST,
  data: id,
});

export const getProductByIdSuccess = (product: IProductItem): IActions => ({
  type: GET_PRODUCT_BY_ID_SUCCESS,
  data: product,
});

export const getProductByIdError = (message: string): IActions => ({
  type: GET_PRODUCT_BY_ID_ERROR,
  data: message,
});

// add product
export const addProductRequest = (product: IProductFormData): IActions => ({
  type: ADD_PRODUCT_REQUEST,
  data: product,
});

export const addProductSuccess = (product: IProductItem): IActions => ({
  type: ADD_PRODUCT_SUCCESS,
  data: product,
});

export const addProductError = (message: string): IActions => ({
  type: ADD_PRODUCT_ERROR,
  data: message,
});

// upload main image
export const uploadMainImgRequest = (productId: string, imgName: string): IActions => ({
  type: UPLOAD_MAIN_IMG_REQUEST,
  data: { productId, imgName },
});

export const uploadMainImgSuccess = (mainImg: string): IActions => ({
  type: UPLOAD_MAIN_IMG_SUCCESS,
  data: mainImg,
});

export const uploadMainImgError = (message: string): IActions => ({
  type: UPLOAD_MAIN_IMG_ERROR,
  data: message,
});

// upload images
export const uploadImagesRequest = (images: string[]): IActions => ({
  type: UPLOAD_IMAGES_REQUEST,
  data: images,
});

export const uploadImagesSuccess = (images: string): IActions => ({
  type: UPLOAD_IMAGES_SUCCESS,
  data: images,
});

export const uploadImagesError = (message: string): IActions => ({
  type: UPLOAD_IMAGES_ERROR,
  data: message,
});

// update product
export const updateProductRequest = (
  product: IProductFormData,
  id: number,
  file: Array<File>
): IActions => ({
  type: UPDATE_PRODUCT_REQUEST,
  data: { id, product, file },
});

export const updateProductSuccess = (product: IProductItem): IActions => ({
  type: UPDATE_PRODUCT_SUCCESS,
  data: product,
});

export const updateProductError = (message: string): IActions => ({
  type: UPDATE_PRODUCT_ERROR,
  data: message,
});

// delete product
export const deleteProductRequest = (id: number): IActions => ({
  type: DELETE_PRODUCT_REQUEST,
  data: id,
});

export const deleteProductSuccess = (product: IProductItem): IActions => ({
  type: DELETE_PRODUCT_SUCCESS,
  data: product,
});

export const deleteProductError = (message: string): IActions => ({
  type: DELETE_PRODUCT_ERROR,
  data: message,
});
//

export const loadUsers = (users: IUserItem[]): IActions => ({ type: LOAD_USERS, data: users });
export const fetchUsers = (): IActions => ({ type: REQUEST_USERS });

// Settings
export const fetchSettings = (): IActions => ({ type: REQUEST_SETTINGS });
export const loadSettings = (settings: ISettingsItem[]): IActions => ({
  type: LOAD_SETTINGS,
  data: settings,
});

export const fetchUpdateSettings = (name: string, settings: object): IActions => ({
  type: REQUEST_UPDATE_SETTINGS,
  data: { name, settings },
});
export const updateSetting = (settings: ISettingsItem): IActions => ({
  type: UPDATE_SETTINGS,
  data: settings,
});

// Theme
export const switchDarkMode = (): IActions => ({ type: SWITCH_DARK_MODE });

// SnackBar
export const successSnackBar = (): IActions => ({
  type: SUCCESS_SNACKBAR,
});
export const failSnackBar = (error: ISettingError): IActions => ({
  type: FAIL_SNACKBAR,
  data: error,
});
export const closeSnackBar = (): IActions => ({ type: CLOSE_SNACKBAR });
