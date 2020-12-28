import { IUserItem } from './user-item';

export interface IUsersData {
  list: Array<IUserItem>
}

export interface UserTableData {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  password: string;
  role: string;
  users: number;
};