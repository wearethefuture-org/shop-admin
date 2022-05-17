import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  changeActiveSliderAnimation,
  getActiveSliderAnimation,
  getSliderAnimations,
} from '../actions/sliderAnimations.actions';
import { failSnackBar } from '../actions/snackbar.actions';
import {
  apiChangeActiveSliderAnimation,
  apiGetActiveSliderAnimation,
  apiGetSliderAnimations,
} from './services/sliderAnimations.service';

export function* getSliderAnimationsWorker(): SagaIterator {
  try {
    const animations = yield call(apiGetSliderAnimations);
    yield put(getSliderAnimations(animations));
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}

export function* getActiveSliderAnimationWorker(): SagaIterator {
  try {
    const animation = yield call(apiGetActiveSliderAnimation);
    yield put(getActiveSliderAnimation(animation));
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}

type Params = { data: { id: number; isActive: boolean }; type: string };

export function* changeActiveSliderAnimationWorker({ data }: Params): SagaIterator {
  try {
    const animation = yield call(apiChangeActiveSliderAnimation, data.id, data.isActive);
    yield put(changeActiveSliderAnimation(animation.id, animation.active));
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}
