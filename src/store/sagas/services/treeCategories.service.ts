import { api } from '../../../api/api';

export async function fetchedTreeCategories() {
	const treeCategories = await api.treeCategories.get();
	return treeCategories.data;
}

export async function apiGetTreeCategoriesByKey(key: string) {
	const treeCategories = await api.treeCategories.getByKey(key);
	return treeCategories.data;
}

export async function apiGetTreeCategoriesById(id: number) {
	const treeCategories = await api.treeCategories.getById(id);
	return treeCategories.data;
}
