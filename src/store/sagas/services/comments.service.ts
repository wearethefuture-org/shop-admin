import { api } from '../../../api/api';

export async function apiGetComments(page: number, limit: number) {
  const comments = await api.comments.get(page, limit);
  return comments.data;
}

export async function apiDeleteComment(id: number) {
  await api.comments.delete(id);
  return id;
}
