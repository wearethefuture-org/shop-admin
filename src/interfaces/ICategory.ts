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

export interface IUpdateCategory {
  id: number;
  name?: string;
  description?: string;
  key?: string;
  characteristicGroups?: {
    name?: string;
    id?: number;
    characteristics: {
      id?: number;
      name?: string;
      description?: string;
      required?: boolean;
      type?: string;
      defaultValues?: {
        values: string[];
      };
      minValue?: number;
      maxValue?: number;
      categoryId?: number;
    }[];
  }[];
  removedCharacteristics?: {
    characteristicGroupIDs?: number[];
    characteristicIDs?: number[];
  };
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

export interface IChar {
  id?: number;
  name: string;
  description: string;
  required?: boolean;
  type: string;
  minValue?: number;
  maxValue?: number;
  defaultValues?: { values: string[] };
}

export interface ICharResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  required: boolean;
  type: string;
  minValue: number;
  maxValue: number;
  defaultValues: null | { values: string[] };
}

export interface IGroupResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  characteristic: ICharResponse[];
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
