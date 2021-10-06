import { IActions } from '../../interfaces/actions';
import { ISearchItems, ISearchItemsResponse } from '../../interfaces/ISearch';

import {
  GET_SEARCH_ITEMS_ERROR,
  GET_SEARCH_ITEMS_REQUEST,
  GET_SEARCH_ITEMS_SUCCESS,
} from '../types';

export const getSearchItemsRequest = (fields: ISearchItems): IActions => ({
  type: GET_SEARCH_ITEMS_REQUEST,
  data: { fields },
});

export const getSearchItemsSuccess = (items: ISearchItemsResponse[]): IActions => ({
  type: GET_SEARCH_ITEMS_SUCCESS,
  data: items,
});

export const getSearchItemsError = (message: string): IActions => ({
  type: GET_SEARCH_ITEMS_ERROR,
  data: message,
});
