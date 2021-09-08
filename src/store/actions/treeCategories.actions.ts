import { IActions } from '../../interfaces/actions';
import { IAddTreeCategory, IGetTreeCategoriesResponse } from '../../interfaces/ITreeCategory';
import { TreeCategory } from '../../pages/TreeCategories/TreeCategoryInfo/treeCategoryReducer';
import {
  GET_TREE_CATEGORIES_REQUEST,
  GET_TREE_CATEGORIES_SUCCESS,
  GET_TREE_CATEGORIES_ERROR,
  ADD_TREE_CATEGORY,
  DELETE_TREE_CATEGORY,
  UPDATE_TREE_CATEGORY_REQUEST,
  UPDATE_TREE_CATEGORY_SUCCESS,
  UPDATE_TREE_CATEGORY_ERROR,
  GET_TREE_CATEGORIES_BY_ID_REQUEST,
  GET_TREE_CATEGORIES_BY_ID_SUCCESS,
  GET_TREE_CATEGORIES_BY_ID_ERROR,
} from '../types';

export const getTreeCategoriesRequest = (): IActions => ({ type: GET_TREE_CATEGORIES_REQUEST });

export const getTreeCategoriesSuccess = (
  treeCategories: IGetTreeCategoriesResponse[]
): IActions => ({
  type: GET_TREE_CATEGORIES_SUCCESS,
  data: treeCategories,
});

export const getTreeCategoriesError = (message: string): IActions => ({
  type: GET_TREE_CATEGORIES_ERROR,
  data: message,
});

// add

export const addTreeCategory = (data: IAddTreeCategory): IActions => ({
  type: ADD_TREE_CATEGORY,
  data,
});

//delete

export const deleteTreeCategory = (id: number): IActions => ({
  type: DELETE_TREE_CATEGORY,
  data: id,
});

// get by id

export const getTreeCategoryByIdRequest = (id: number): IActions => ({
  type: GET_TREE_CATEGORIES_BY_ID_REQUEST,
  data: id,
});

export const getTreeCategoriesByIdSuccess = (category: IGetTreeCategoriesResponse): IActions => ({
  type: GET_TREE_CATEGORIES_BY_ID_SUCCESS,
  data: category,
});

export const getTreeCategoriesByIdError = (message: string): IActions => ({
  type: GET_TREE_CATEGORIES_BY_ID_ERROR,
  data: message,
});

// update

export const updateTreeCategoryRequest = (data: TreeCategory): IActions => ({
  type: UPDATE_TREE_CATEGORY_REQUEST,
  data,
});

export const updateTreeCategorySuccess = (category: IGetTreeCategoriesResponse): IActions => ({
  type: UPDATE_TREE_CATEGORY_SUCCESS,
  data: category,
});

export const updateTreeCategoryError = (message: string): IActions => ({
  type: UPDATE_TREE_CATEGORY_ERROR,
  data: message,
});
