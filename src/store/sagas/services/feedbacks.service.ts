import { api } from '../../../api/api';

export async function apiGetFeedbacks(page: number, limit: number, sort: string, sortDirect: string) {
  const feedbacks = await api.feedbacks.get(page, limit, sort, sortDirect);
  return feedbacks.data;
}

export async function apiDeleteFeedback(id: number) {
  await api.feedbacks.delete(id);
  return id;
}
