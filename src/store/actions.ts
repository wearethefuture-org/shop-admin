import { IActions } from '../interfaces/actions';
import { ICategoryItem } from '../interfaces/category-Item';
import { ADD_CATEGORY, LOAD_CATEGORIES, REQUEST_ADD_CATEGORIES, REQUEST_CATEGORIES } from './types';

export const loadCategories = (categories: ICategoryItem[]): IActions => ({ type: LOAD_CATEGORIES, data: categories} );
export const fetchCategories = (): IActions => ({ type: REQUEST_CATEGORIES });
export const fetchAddCategories = (name: string, description: string): IActions => ({
  type: REQUEST_ADD_CATEGORIES,
  data: { name, description },
});
export const addCategory = (category: ICategoryItem): IActions => ({
  type: ADD_CATEGORY,
  data: category,
});
