import { ICategoryItem } from './category-Item';

export interface ICategoriesData {
  list: Array<ICategoryItem>;
}

export interface CategoryTableData {
  id: number;
  key: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description?: string;
  products: number;
}
