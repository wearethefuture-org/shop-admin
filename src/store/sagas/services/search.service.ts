import { api } from '../../../api/api';
import { ISearchItems } from '../../../interfaces/ISearch';

export async function apiGetSearchItems(fields: ISearchItems) {
  const items = await api.search.getSearchItems(fields);
  return items.data;
}
