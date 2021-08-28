import { IActions } from '../../interfaces/actions';
import { IGetTreeCategoriesResponse } from '../../interfaces/ITreeCategory';
import {
	LOAD_TREE_CATEGORIES,
	REQUEST_TREE_CATEGORIES,
	GET_TREE_CATEGORIES_BY_ID_REQUEST,
	GET_TREE_CATEGORIES_BY_ID_SUCCESS,
	GET_TREE_CATEGORIES_BY_ID_ERROR,
} from '../types';

export const loadTreeCategories = (treeCategories: IGetTreeCategoriesResponse[]): IActions => ({
	type: LOAD_TREE_CATEGORIES,
	data: treeCategories,
});
export const fetchTreeCategories = (): IActions => ({ type: REQUEST_TREE_CATEGORIES });

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
