import { api } from '../../../api/api';
import { IUserCreeds } from '../../../interfaces/IUsers';

export async function apiSignIn(data: IUserCreeds) {
  const user = await api.user.auth(data);
  return user.data;
}

export async function userFetch() {
  const user = await api.user.get();
  return user.data;
}

export async function updateProfileUser(data) {
  const user = await api.user.updateUserData(data);
  return user.data;
}

export async function addAvatar(data) {
  const message = await api.user.addAvatar(data);
  return message.data;
}

export async function deleteAvatar() {
  const message = await api.user.deleteAvatar();
  return message.data;
}
