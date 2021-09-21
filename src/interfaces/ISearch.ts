import { IGetProducts } from './IProducts';
import { IGetTreeCategoriesResponse } from './ITreeCategory';

export interface ISearchItemsResponse {
  data: IGetProducts[] | IGetTreeCategoriesResponse[];
  count: number;
  totalPages: number;
}
