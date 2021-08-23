import { api } from '../../../api/api';

export async function fetchedTreeCategories() {
	const treeCategories = await api.treeCategories.get();
	return treeCategories.data;
}
