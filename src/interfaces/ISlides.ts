export interface ISlideFormValues {
  id: number;
  name: string;
  text: string;
  image: string;
  href: string;
  isShown: boolean;
  priority: number;
}

export interface  ISlideUpdateValues {
  id: number;
  body: FormData;
}

export interface InnerSlideFormProps {
  handleClose: () => void;
}

export interface ISlideVisibility{
  id:number
  isShown: boolean
}

export interface ISlideItem {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  text: string;
  image: string|File|null;
  href: string;
  isShown: boolean;
  priority: number;
}

export interface ISlidesData {
  list: Array<ISlideItem>
}

export interface SlideTableData {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  text: string;
  image: string|File|null;
  href: string;
  isShown: boolean;
  priority: number;
}
