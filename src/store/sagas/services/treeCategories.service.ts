import { api } from '../../../api/api';
import { IAddTreeCategory, IDisableEnableCategory } from '../../../interfaces/ITreeCategory';
import { TreeCategory } from '../../../pages/TreeCategories/TreeCategoryInfo/treeCategoryReducer';

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

export async function apiUpdateTreeCategory(data: TreeCategory) {
  const category = await api.treeCategories.update(data);
  return category.data;
}

export async function apiGetTreeCategoriesById(id: number) {
  const treeCategories = await api.treeCategories.getById(id);
  return treeCategories.data;
}

export async function disableEnableCategory(data: IDisableEnableCategory) {
  const categories = await api.treeCategories.disableEnable(data);
}
