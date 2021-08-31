import { api } from '../../../api/api';
import { IAddTreeCategory } from '../../../interfaces/ITreeCategory';

export async function fetchedTreeCategories() {
	const treeCategories = await api.treeCategories.get();
	return treeCategories.data;
}

export async function addTreeCategory(data: IAddTreeCategory) {
	const newCategory = await api.treeCategories.add(data);
	return newCategory.data;
}

export async function deleteTreeCategory(id: number) {
	await api.treeCategories.delete(id);
	return id;
}

export async function apiGetTreeCategoriesById(id: number) {
	const treeCategories = await api.treeCategories.getById(id);
	return treeCategories.data;
}
