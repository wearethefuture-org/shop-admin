export interface IFormValues {
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
    //saveImage: any;
}

