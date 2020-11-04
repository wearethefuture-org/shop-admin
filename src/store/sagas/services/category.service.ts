import { api } from '../../../api/api';
import { IActions } from '../../../interfaces/actions';

export async function fetchedCategories () {
   const categories = await api.categories.get();
   return categories.data;
}

export async function addCategories (data: IActions) {
   const newCategory =  await api.categories.add(data);
   return newCategory.data;
}
