import { IUserItem } from './IUsers';
import { IGetProducts } from './IProducts';
import { IGetTreeCategoriesResponse, ITreeCategory } from './ITreeCategory';

export interface ISearchItemsResponse {
  data: IGetProducts[] | IGetTreeCategoriesResponse[] | IUserItem[];
  count: number;
  totalPages: number;
}

export interface ISearchItems {
  option: string;
  query: string;
  page: number;
  limit: number;
}

export interface ISearchState {
  list: IGetTreeCategoriesResponse[];
  count: number;
  totalPages: number;
  error: string | null;
  loading: boolean;
}
