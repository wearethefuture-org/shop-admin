import { IActions } from '../../interfaces/actions';
import {
  IAddCategory,
  GeneralCategory,
  ICategoryResponse,
  IGetCategoriesResponse,
} from '../../interfaces/ICategory';
import { Category } from '../../pages/Categories/CategoryInfo/categoryReducer';
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
  CLEAR_CURRENT_CATEGORY,
} from '../types';

export const loadCategories = (categories: IGetCategoriesResponse[]): IActions => ({
  type: LOAD_CATEGORIES,
  data: categories,
});
export const fetchCategories = (): IActions => ({ type: REQUEST_CATEGORIES });

export const fetchAddCategories = (data: IAddCategory): IActions => ({
  type: REQUEST_ADD_CATEGORIES,
  data,
});

export const addCategory = (category: GeneralCategory): IActions => ({
  type: ADD_CATEGORY,
  data: category,
});

// get one by id
export const getCategoryByIdRequest = (id: number): IActions => ({
  type: GET_CATEGORY_BY_ID_REQUEST,
  data: id,
});

export const getCategoryByIdSuccess = (category: ICategoryResponse): IActions => ({
  type: GET_CATEGORY_BY_ID_SUCCESS,
  data: category,
});

export const getCategoryByIdError = (message: string): IActions => ({
  type: GET_CATEGORY_BY_ID_ERROR,
  data: message,
});

// update category
export const updateCategoryRequest = (data: Category): IActions => ({
  type: UPDATE_CATEGORY_REQUEST,
  data,
});

export const updateCategorySuccess = (category: ICategoryResponse): IActions => ({
  type: UPDATE_CATEGORY_SUCCESS,
  data: category,
});

export const updateCategoryError = (message: string): IActions => ({
  type: UPDATE_CATEGORY_ERROR,
  data: message,
});

export const clearCurrentCategory = () => ({
  type: CLEAR_CURRENT_CATEGORY,
});
