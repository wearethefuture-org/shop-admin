import { IActions } from '../interfaces/actions';
import { ICategoryItem } from "../interfaces/category-Item";
import { IProductItem } from "../interfaces/IProducts";
import { ISettingError, ISettingsItem } from '../interfaces/ISettings';
import {
  ADD_CATEGORY,
  LOAD_CATEGORIES,
  REQUEST_CATEGORIES,
  REQUEST_ADD_CATEGORIES,
  LOAD_PRODUCTS,
  REQUEST_PRODUCTS,
  SWITCH_DARK_MODE,
  REQUEST_SETTINGS,
  LOAD_SETTINGS,
  REQUEST_UPDATE_SETTINGS,
  UPDATE_SETTINGS,
  SUCCESS_SNACKBAR,
  FAIL_SNACKBAR,
  CLOSE_SNACKBAR
} from "./types";

export const loadCategories = (categories: ICategoryItem[]): IActions => ({ type: LOAD_CATEGORIES, data: categories });
export const fetchCategories = (): IActions => ({ type: REQUEST_CATEGORIES });

export const fetchAddCategories = (name: string, description: string): IActions => ({
  type: REQUEST_ADD_CATEGORIES,
  data: { name, description },
});
export const addCategory = (category: ICategoryItem): IActions => ({
  type: ADD_CATEGORY,
  data: category,
});

export const loadProducts = (products: IProductItem[]): IActions => ({ type: LOAD_PRODUCTS, data: products });
export const fetchProducts = (): IActions => ({ type: REQUEST_PRODUCTS });

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
