import { IActions } from '../../interfaces/actions';
import { IGetTreeCategoriesResponse } from '../../interfaces/ITreeCategory';
import { LOAD_TREE_CATEGORIES, REQUEST_TREE_CATEGORIES } from '../types';

export const loadTreeCategories = (treeCategories: IGetTreeCategoriesResponse[]): IActions => ({
	type: LOAD_TREE_CATEGORIES,
	data: treeCategories,
});
export const fetchTreeCategories = (): IActions => ({ type: REQUEST_TREE_CATEGORIES });
