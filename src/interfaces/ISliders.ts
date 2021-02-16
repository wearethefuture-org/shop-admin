export interface ISliderFormValues {
  id: number;
  name: string;
  text: string;
  image: string;
  href: string;
  isShown: boolean;
  priority: number;
}

export interface InnerSliderFormProps {
  handleClose: () => void;
}

export interface ISliderItem {
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

export interface ISlidersData {
  list: Array<ISliderItem>
}

export interface SliderTableData {
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
