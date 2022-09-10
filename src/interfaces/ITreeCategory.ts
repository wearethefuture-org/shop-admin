import { Common } from './IProducts';

export interface ITreeCategory extends Common {
  key: string;
  name: string;
  description?: string;
  icon: {name: string};
  mpath?: string;
  parent?: IParent | null;
  children?: IChildren[];
  disabledByAdmin: boolean;
}

export interface IChildren extends Common {
  key: string;
  name: string;
  description?: string;
  mpath?: string;
  parent?: IParent | null;
  children?: IChildren[];
  disabledByAdmin: boolean;
}

export interface IParent extends Common {
  id: number;
}

export interface ICharResponse extends Common {
  name: string;
  description: string;
  required: boolean;
  type: string;
  minValue: number | null;
  maxValue: number | null;
  defaultValues: null | { values: string[] };
}

export interface IGroupResponse extends Common {
  name: string;
  characteristic: ICharResponse[];
}

export interface IGetTreeCategoriesResponse extends ITreeCategory {
  characteristicGroup: IGroupResponse[];
}

export interface IAddTreeCategory {
  name: string;
  description?: string;
  key: string;
  icon: string | File;
  parentId?: number | null;
  children?: IChildren[];
}

export interface ICharToAdd {
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

export interface IDisableEnableCategory {
  id: number;
  disable: boolean;
}
