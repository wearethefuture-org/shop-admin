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
  LOAD_PRODUCTS,
  REQUEST_PRODUCTS,
  LOAD_PRODUCT_BY_ID,
  REQUEST_PRODUCT_BY_ID,
  ADD_PRODUCT,
  REQUEST_ADD_PRODUCT,
  REQUEST_DELETE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  REQUEST_UPDATE_PRODUCT,
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

export const loadProducts = (products: IProductItem[]): IActions => ({
  type: LOAD_PRODUCTS,
  data: products,
});
export const fetchProducts = (): IActions => ({ type: REQUEST_PRODUCTS });

export const loadProductById = (product: IProductItem[]): IActions => ({
  type: LOAD_PRODUCT_BY_ID,
  data: product,
});
export const fetchProductById = (id: number): IActions => ({
  type: REQUEST_PRODUCT_BY_ID,
  data: id,
});

export const fetchAddProduct = (product: IProductFormData): IActions => ({
  type: REQUEST_ADD_PRODUCT,
  data: product,
});
export const addProduct = (product: IProductItem): IActions => ({
  type: ADD_PRODUCT,
  data: product,
});

export const deleteProduct = (product: IProductItem[]): IActions => ({
  type: DELETE_PRODUCT,
  data: product,
});
export const fetchDeleteProduct = (id: number): IActions => ({
  type: REQUEST_DELETE_PRODUCT,
  data: id,
});

export const updateProduct = (product: IProductItem[]): IActions => ({
  type: UPDATE_PRODUCT,
  data: product,
});
export const fetchUpdateProduct = (product: IProductFormData, id: number, file:  Array<File>): IActions => ({
  type: REQUEST_UPDATE_PRODUCT,
  data: { id, product, file },
});
export const loadUsers = (users: IUserItem[]): IActions => ({ type: LOAD_USERS, data: users });
export const fetchUsers = (): IActions => ({ type: REQUEST_USERS });

// Settings
export const fetchSettings = (): IActions => ({ type: REQUEST_SETTINGS });
export const loadSettings = (settings: ISettingsItem[]): IActions =>({ type: LOAD_SETTINGS, data: settings });

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
export const successSnackBar = (): IActions => ({ type: SUCCESS_SNACKBAR });
export const failSnackBar = (error: ISettingError): IActions => ({ type: FAIL_SNACKBAR, data: error });
export const closeSnackBar = (): IActions => ({ type: CLOSE_SNACKBAR });