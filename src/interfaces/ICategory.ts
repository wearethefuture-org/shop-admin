export interface ICategoryItem {
  id?: number;
  key?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  description?: string;
  products?: any[];
  characteristicGroups?: IGroup[] | [];
  removedCharacteristics?: {
    characteristicGroupIDs?: number[] | [];
    characteristicIDs?: number[] | [];
  };
}

export interface ICategoryItemResponse {
  id: number;
  key: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  products?: any[];
  characteristicGroup: IGroupResponse[] | [];
  removedCharacteristics: {
    characteristicGroupIDs: [];
    characteristicIDs: [];
  };
}

export interface IGroup {
  id?: number;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  characteristics: IChar[];
}

export interface IGroupResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  characteristic: ICharResponse[] | [];
}

export interface IChar {
  id?: number;
  name: string;
  description: string;
  required: boolean;
  type: string;
  minValue?: number;
  maxValue?: number;
  defaultValues: any;
}

export interface ICharResponse {
  id?: number;
  name: string;
  description: string;
  required: boolean;
  type: string;
  minValue?: number;
  maxValue?: number;
  defaultValues: any;
}

export interface ICategoriesData {
  list: Array<ICategoryItem>;
  loading: boolean;
  currentCategory: ICategoryItem | null;
  error: string | null;
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

export interface IFormValues {
  name: string;
  key: string;
  description: string;
}

export interface InnerCategoryFormProps {
  handleClose: () => void;
}
