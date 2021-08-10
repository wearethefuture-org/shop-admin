import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { failSnackBar } from '../actions/snackbar.actions';
import { apiGetLotteries } from './services/lotteries.service';
import { getLotteryError, getLotterySuccess } from '../actions/lottery.actions';


export function* getLotteriesWorker(): SagaIterator {
  try {
    const lotteries = yield call(apiGetLotteries);
    yield put(getLotterySuccess(lotteries));
  } catch (error) {
    yield put(failSnackBar(error.message));
    yield put(getLotteryError(error.message));
  }
}