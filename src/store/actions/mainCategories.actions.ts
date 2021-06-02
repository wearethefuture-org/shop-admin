import { IActions } from '../../interfaces/actions';
import {
  IAddMainCategory,
  GeneralMainCategory,
  IMainCategoryResponse,
  IGetMainCategoriesResponse,
} from '../../interfaces/IMainCategory';
import { MainCategory } from '../../pages/MainCategories/MainCategoryInfo/mainCategoryReducer';
import {
  ADD_MAIN_CATEGORY,
  LOAD_MAIN_CATEGORIES,
  REQUEST_MAIN_CATEGORIES,
  REQUEST_ADD_MAIN_CATEGORIES,
  GET_MAIN_CATEGORY_BY_ID_REQUEST,
  GET_MAIN_CATEGORY_BY_ID_SUCCESS,
  GET_MAIN_CATEGORY_BY_ID_ERROR,
  UPDATE_MAIN_CATEGORY_REQUEST,
  UPDATE_MAIN_CATEGORY_SUCCESS,
  UPDATE_MAIN_CATEGORY_ERROR,
} from '../types';

export const loadMainCategories = (mainCategories: IGetMainCategoriesResponse[]): IActions => ({
  type: LOAD_MAIN_CATEGORIES,
  data: mainCategories,
});
export const fetchMainCategories = (): IActions => ({ type: REQUEST_MAIN_CATEGORIES });

export const fetchAddMainCategories = (data: IAddMainCategory): IActions => ({
  type: REQUEST_ADD_MAIN_CATEGORIES,
  data,
});

export const addMainCategory = (mainCategory: GeneralMainCategory): IActions => ({
  type: ADD_MAIN_CATEGORY,
  data: mainCategory,
});

// get one by id
export const getMainCategoryByIdRequest = (id: number): IActions => ({
  type: GET_MAIN_CATEGORY_BY_ID_REQUEST,
  data: id,
});

export const getMainCategoryByIdSuccess = (mainCategory: IMainCategoryResponse): IActions => ({
  type: GET_MAIN_CATEGORY_BY_ID_SUCCESS,
  data: mainCategory,
});

export const getMainCategoryByIdError = (message: string): IActions => ({
  type: GET_MAIN_CATEGORY_BY_ID_ERROR,
  data: message,
});

// update category
export const updateMainCategoryRequest = (data: MainCategory): IActions => ({
  type: UPDATE_MAIN_CATEGORY_REQUEST,
  data,
});

export const updateMainCategorySuccess = (mainCategory: IMainCategoryResponse): IActions => ({
  type: UPDATE_MAIN_CATEGORY_SUCCESS,
  data: mainCategory,
});

export const updateMainCategoryError = (message: string): IActions => ({
  type: UPDATE_MAIN_CATEGORY_ERROR,
  data: message,
});
