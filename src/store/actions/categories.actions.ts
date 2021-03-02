import { IActions } from '../../interfaces/actions';
import { ICategoryItem } from '../../interfaces/ICategory';
import {
  ADD_CATEGORY,
  LOAD_CATEGORIES,
  REQUEST_CATEGORIES,
  REQUEST_ADD_CATEGORIES,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_SUCCESS,
  GET_CATEGORY_BY_ID_ERROR,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
} from '../types';

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

// get one by id
export const getCategoryByIdRequest = (id: number): IActions => ({
  type: GET_CATEGORY_BY_ID_REQUEST,
  data: id,
});

export const getCategoryByIdSuccess = (product: ICategoryItem): IActions => ({
  type: GET_CATEGORY_BY_ID_SUCCESS,
  data: product,
});

export const getCategoryByIdError = (message: string): IActions => ({
  type: GET_CATEGORY_BY_ID_ERROR,
  data: message,
});

// update category
export const updateCategoryRequest = (data): IActions => ({
  type: UPDATE_CATEGORY_REQUEST,
  data,
});

export const updateCategorySuccess = (category: ICategoryItem): IActions => ({
  type: UPDATE_CATEGORY_SUCCESS,
  data: category,
});

export const updateCategoryError = (message: string): IActions => ({
  type: UPDATE_CATEGORY_ERROR,
  data: message,
});
