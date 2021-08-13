import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { failSnackBar } from '../actions/snackbar.actions';
import { apiAddLottery, apiGetLotteries } from './services/lotteries.service';
import { addLotterySuccess, getLotteryError, getLotterySuccess } from '../actions/lottery.actions';
import { IActions } from '../../interfaces/actions';


export function* getLotteriesWorker(): SagaIterator {
  try {
    const lotteries = yield call(apiGetLotteries);
    yield put(getLotterySuccess(lotteries));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getLotteryError(error.message));
  }
}

export function* addLotteryWorker({ data }: IActions): SagaIterator {
  try {
    const newLottery = yield call(apiAddLottery, data);
    yield put(addLotterySuccess(newLottery));
  } catch (error) {
    yield put(failSnackBar(error.message));
  }
}