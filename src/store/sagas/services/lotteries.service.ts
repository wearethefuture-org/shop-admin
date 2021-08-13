import { api } from '../../../api/api';
import { IAddLotteryItem } from '../../../interfaces/ILottery';

export async function apiGetLotteries() {
  const lotteries = await api.lottery.getAllLottery();
  return lotteries.data
}

export async function apiAddLottery(data: IAddLotteryItem) {
  const newLottery = await api.lottery.addLottery(data);
  return newLottery.data;
}
