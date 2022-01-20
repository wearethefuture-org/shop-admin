import { api } from '../../../api/api';
import { IDrawReqAdd } from '../../../interfaces/IDraw';

export async function apiAddDraw(drawValues: IDrawReqAdd) {
  const draw = await api.draws.add(drawValues);
  return draw.data;
}

export async function apiUpdateDraw(id: number, drawValues: IDrawReqAdd) {
  const draw = await api.draws.update(id, drawValues);
  return draw.data;
}

export async function apiGetDraws(page: number, limit: number) {
  const draws = await api.draws.get(page, limit);
  return draws.data;
}

export async function apiDeleteDraw(id: number) {
  await api.draws.delete(id);
  return id;
}
