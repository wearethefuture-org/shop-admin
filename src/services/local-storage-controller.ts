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

export const getExpandedTrees = (): number[] => {
  const trees = localStorage.getItem('TREE');
  return trees ? JSON.parse(trees) : [];
};

export const setExpandedTrees = (id: number) => {
  const expandedTrees = getExpandedTrees();

  expandedTrees?.includes(id)
    ? localStorage.setItem('TREE', JSON.stringify(expandedTrees.filter((sec) => sec !== id)))
    : localStorage.setItem('TREE', JSON.stringify(expandedTrees.concat(id)));
};
