import { api } from '../../../api/api';
import { IActions } from '../../../interfaces/actions';

export async function fetchedSettings() {
  const settings = await api.settings.get();
  return settings.data;
}

export async function updateSettings(data: IActions) {
  const updatedSettings = await api.settings.put(data);
  return updatedSettings.data;
}
