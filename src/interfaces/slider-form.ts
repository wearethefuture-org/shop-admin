export interface IFormValues {
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
