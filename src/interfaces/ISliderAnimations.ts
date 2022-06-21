export interface ISliderAnimation {
  id: number;
  animation: string;
  active: boolean;
}

export interface ISliderAnimations {
  sliderAnimations: ISliderAnimation[];
}

export interface ISliderAnimationsData {
  id: number;
  animation: string;
  active: boolean;
  animations: any;
}
