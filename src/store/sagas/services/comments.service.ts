import { api } from '../../../api/api';

export async function apiGetComments(page: number, limit: number, sort: string, sortDirect: string) {
  const comments = await api.comments.get(page, limit, sort, sortDirect);
  return comments.data;
}

export async function apiGetByRangeComments(datesArray: string[]) {
  const comments = await api.comments.getByDatesRange(datesArray);
  return comments.data;
}

export async function apiDeleteComment(id: number) {
  await api.comments.delete(id);
  return id;
}
