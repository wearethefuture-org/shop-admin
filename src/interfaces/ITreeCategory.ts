import { Common } from './IProducts';

export interface ITreeCategory extends Common {
	key: string;
	name: string;
	description: string;
}

export interface IParent {
	id: number;
}

export interface IGetTreeCategoriesResponse extends ITreeCategory {
	mpath: string;
	parent: IParent[] | null;
	children: ITreeCategory[];
}
