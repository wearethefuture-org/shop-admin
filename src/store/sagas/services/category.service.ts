import { api } from '../../../api/api';
import { IAddCategory } from '../../../interfaces/ICategory';
import { Category } from '../../../pages/Categories/CategoryInfo/categoryReducer';

export async function fetchedCategories() {
  const categories = await api.categories.get();  
  return categories.data;
}

export async function addCategories(data: IAddCategory) {
  const newCategory = await api.categories.add(data);
  return newCategory.data;
}

export async function apiGetCategoryById(id: number) {
  const category = await api.categories.getById(id);
  return category.data;
}

export async function apiUpdateCategory(data: Category) {
  const category = await api.categories.update(data);
  return category.data;
}
