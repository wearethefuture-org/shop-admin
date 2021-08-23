import { IActions } from '../../interfaces/actions';
import { IGetTreeCategoriesResponse } from '../../interfaces/ITreeCategory';
import {
	LOAD_TREE_CATEGORIES,
	REQUEST_TREE_CATEGORIES,
	GET_TREE_CATEGORIES_BY_KEY,
} from '../types';

export const loadTreeCategories = (treeCategories: IGetTreeCategoriesResponse[]): IActions => ({
	type: LOAD_TREE_CATEGORIES,
	data: treeCategories,
});
export const fetchTreeCategories = (): IActions => ({ type: REQUEST_TREE_CATEGORIES });

export const getTreeCategoriesByKeySuccess = (category: IGetTreeCategoriesResponse): IActions => ({
	type: GET_TREE_CATEGORIES_BY_KEY,
	data: category,
});

export const getTreeCategoriesByKeyError = (message: string): IActions => ({
	type: GET_TREE_CATEGORIES_BY_KEY,
	data: message,
});
