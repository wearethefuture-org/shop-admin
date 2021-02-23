import { IActions } from '../../interfaces/actions';
import { SWITCH_DARK_MODE } from '../types';

export const switchDarkMode = (): IActions => ({ type: SWITCH_DARK_MODE });
