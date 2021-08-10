import { api } from '../../../api/api';

export async function apiGetFeedbacks(page: number, limit: number) {
  const feedbacks = await api.feedbacks.get(page, limit);
  return feedbacks.data;
}

export async function apiDeleteFeedback(id: number) {
  await api.feedbacks.delete(id);
  return id;
}
