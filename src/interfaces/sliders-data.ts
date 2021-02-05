import { ISliderItem } from './slider-item';

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
};

