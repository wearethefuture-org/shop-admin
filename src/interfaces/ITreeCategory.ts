import { Common } from './IProducts';

export interface ITreeCategory extends Common {
	key: string;
	name: string;
	description: string;
}

export interface IChildren extends Common {
	key: string;
	name: string;
	description: string;
	mpath?: string;
	parent?: IParent[] | null;
	children?: IChildren[];
}

export interface IParent {
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
	mpath: string;
	parent?: IParent[] | null;
	children: IChildren[];
	characteristicGroup?: IGroupResponse[];
}

export interface IAddTreeCategory {
	name: string;
	description: string;
	key: string;
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
