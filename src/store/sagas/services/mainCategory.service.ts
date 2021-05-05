import { api } from '../../../api/api';
import { IAddMainCategory } from '../../../interfaces/IMainCategory';
import { MainCategory } from '../../../pages/MainCategories/MainCategoryInfo/mainCategoryReducer'; 

export async function fetchedMainCategories() {
  const mainCategories = await api.mainCategories.get();  
  return mainCategories.data;  
}

export async function addMainCategories(data: IAddMainCategory) {
  const newMainCategory = await api.mainCategories.add(data);
  return newMainCategory.data;
}

export async function apiGetMainCategoryById(id: number) {
  const mainCategory = await api.mainCategories.getById(id);
  return mainCategory.data;
}

export async function apiUpdateMainCategory(data: MainCategory) {
  const mainCategory = await api.mainCategories.update(data);
  return mainCategory.data;
}
