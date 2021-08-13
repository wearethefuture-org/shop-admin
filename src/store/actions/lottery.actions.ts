import { IActions } from '../../interfaces/actions';
import {
  ADD_LOTTERY_REQUEST, ADD_LOTTERY_SUCCESS,
  GET_LOTTERY, GET_LOTTERY_ERROR, GET_LOTTERY_REQUEST,
} from '../types';
import { IGetProducts } from '../../interfaces/IProducts';
import { IAddLotteryItem } from '../../interfaces/ILottery';

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

export const addLotteryRequest = (data: IAddLotteryItem): IActions => ({
  type: ADD_LOTTERY_REQUEST,
  data,
});

export const addLotterySuccess = (data: IAddLotteryItem): IActions => ({
  type: ADD_LOTTERY_SUCCESS,
  data,
});

