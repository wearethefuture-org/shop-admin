export interface ISettingsItem {
  id: number;
  name: string;
  settings: ISettingsParams;
  createdAt: string;
  updatedAt: string;
}

export interface ISettingsData {
  list: Array<ISettingsItem>;
}

export interface ISettingsParams {
  popularItems: ISettingsParamsItem;
  newArrivals: ISettingsParamsItem;
}

export interface ISettingsParamsItem {
  quantity: number;
  isWidgetActive: boolean;
}
