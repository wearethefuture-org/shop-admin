import { api } from '../../../api/api';

export async function apiGetRoles() {
  const roles = await api.roles.get();
  return roles.data;
}
