import { IActions } from '../../interfaces/actions';
import {
  GET_LOTTERY, GET_LOTTERY_ERROR, GET_LOTTERY_REQUEST,
} from '../types';
import { IGetProducts } from '../../interfaces/IProducts';

export const getLotteryRequest = (): IActions => ({
  type: GET_LOTTERY_REQUEST,
});

export const getLotterySuccess = (lotteries: IGetProducts[]): IActions => ({
  type: GET_LOTTERY,
  data: lotteries,
});

export const getLotteryError = (message: string): IActions => ({
  type: GET_LOTTERY_ERROR,
  data: message,
});

