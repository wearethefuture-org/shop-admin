import { ICategoryItem } from './category-Item';

export interface ICategoriesData {
  list: Array<ICategoryItem>
}

export interface CategoryTableData {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  products: number;
};