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
