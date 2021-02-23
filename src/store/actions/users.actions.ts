import { IActions } from '../../interfaces/actions';
import { IUserItem } from '../../interfaces/Users';
import { LOAD_USERS, REQUEST_USERS } from '../types';

export const loadUsers = (users: IUserItem[]): IActions => ({ type: LOAD_USERS, data: users });

export const fetchUsers = (): IActions => ({ type: REQUEST_USERS });
