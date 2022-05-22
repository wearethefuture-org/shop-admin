import { IActions } from '../../interfaces/actions';
import { ISettingsItem } from '../../interfaces/ISettings';
import {
  REQUEST_SETTINGS,
  LOAD_SETTINGS,
  REQUEST_UPDATE_SETTINGS,
  UPDATE_SETTINGS,
} from '../types';

export const fetchSettings = (): IActions => ({ type: REQUEST_SETTINGS });

export const loadSettings = (settings: ISettingsItem[]): IActions => ({
  type: LOAD_SETTINGS,
  data: settings,
});

export const fetchUpdateSettings = (name: string, settings: string): IActions => ({
  type: REQUEST_UPDATE_SETTINGS,
  data: { name, settings },
});
export const updateSetting = (settings: ISettingsItem): IActions => ({
  type: UPDATE_SETTINGS,
  data: settings,
});
