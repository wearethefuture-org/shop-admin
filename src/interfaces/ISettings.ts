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
  quantityPopularItems: number;
  quantityNewArrivals: number;
}

export interface ISettingError {
  error: string;
}
