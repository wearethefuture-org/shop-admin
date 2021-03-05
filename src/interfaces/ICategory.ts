import { IBasicProduct } from './IProducts';

export interface IGetCategoriesResponse {
  id: number;
  key: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  products: IBasicProduct[];
}

export interface IAddCategory {
  name: string;
  description: string;
  key: string;
}

export interface IAddCategoryResponse {
  id: number;
  key: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
}

// CATEGORY RESPONSE
export interface ICharResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  required: boolean;
  type: string;
  minValue: number | null;
  maxValue: number | null;
  defaultValues: null | { values: string[] };
}

export interface IGroupResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  characteristic: ICharResponse[];
}

export interface ICategoryResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  key: string;
  description: string;
  characteristicGroup: IGroupResponse[];
}

// UPDATE
export interface IChar {
  id?: number;
  tempId?: number;
  name?: string;
  description?: string;
  required?: boolean;
  type?: string;
  minValue?: number | string | null;
  maxValue?: number | string | null;
  defaultValues?: null | { values: string[] };
  categoryId?: number;
}

export interface IGroup {
  id?: number;
  tempId?: number;
  name?: string;
  characteristics?: IChar[];
}

export interface ICategoryToUpdate {
  id: number;
  name?: string;
  key?: string;
  description?: string;
  characteristicGroups: IGroup[];
  removedCharacteristics?: {
    characteristicGroupIDs?: number[];
    characteristicIDs?: number[];
  };
}

export interface ICharToAdd {
  tempId?: number;
  name: string;
  description?: string;
  required?: boolean;
  type?: string;
  minValue?: number | string | null;
  maxValue?: number | string | null;
  defaultVal?: string;
  defaultValues: null | { values: string[] };
  categoryId?: number;
}

export interface CategoryTableData {
  id: number;
  key: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description?: string;
  products: number;
}

export interface InnerCategoryFormProps {
  handleClose: () => void;
}
