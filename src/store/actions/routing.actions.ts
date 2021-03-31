import { IActions } from '../../interfaces/actions';
import { INITIALIZE_ROUT_HISTORY, ROUTING_TO } from '../types';
import { History } from 'history';

export const initRouting = (history: History): IActions => {
  return {
    type: INITIALIZE_ROUT_HISTORY,
    data: history,
  };
};

export const routingTo = (path: string): IActions => {
  return {
    type: ROUTING_TO,
    data: path,
  };
};
