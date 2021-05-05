import { IUserItem } from '../interfaces/IUsers';

export const getToken = (): string | null => {
  return localStorage.getItem('TOKEN');
};

export const setToken = (token: string): void => {
  localStorage.setItem('TOKEN', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('TOKEN');
};

export const setUser = (user: {}) => {
  localStorage.setItem('USER', JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem('USER');
};

export const getUser = (): IUserItem | null => {
  const user = localStorage.getItem('USER');
  return user ? JSON.parse(user) : null;
};
export const clearStorage = () => {
  localStorage.clear();
};
