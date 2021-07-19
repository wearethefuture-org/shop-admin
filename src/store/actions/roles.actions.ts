import { IActions } from '../../interfaces/actions';
import { IRole } from '../../interfaces/IRoles';
import { GET_ROLES_REQUEST, GET_ROLES_SUCCESS, GET_ROLES_ERROR } from '../types';

// get all
export const getRolesRequest = (): IActions => ({
  type: GET_ROLES_REQUEST,
});

export const getRolesSuccess = (roles: IRole[]): IActions => ({
  type: GET_ROLES_SUCCESS,
  data: roles,
});

export const getRolesError = (message: string): IActions => ({
  type: GET_ROLES_ERROR,
  data: message,
});
