import { Common } from './IProducts';

export interface IRole extends Common{
  name: string;
}

export interface IRolesData {
  list: Array<IRole>;
  loading: boolean;
  error: string | null;
}
