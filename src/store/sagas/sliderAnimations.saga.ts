import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  getActiveSliderAnimation,
  getSliderAnimations,
  setActiveSliderAnimation,
  setInactiveSliderAnimation,
} from '../actions/sliderAnimations.actions';
import { failSnackBar } from '../actions/snackbar.actions';
import {
  apiGetActiveSliderAnimation,
  apiGetSliderAnimations,
  apiSetActiveSliderAnimation,
  apiSetInactiveSliderAnimation,
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

type Params = { data: number; type: string };

export function* setActiveSliderAnimationWorker({ data }: Params): SagaIterator {
  try {
    const animation = yield call(apiSetActiveSliderAnimation, data);
    yield put(setActiveSliderAnimation(animation));
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}

export function* setInactiveSliderAnimationWorker({ data }: Params): SagaIterator {
  try {
    const animation = yield call(apiSetInactiveSliderAnimation, data);
    yield put(setInactiveSliderAnimation(animation));
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}
