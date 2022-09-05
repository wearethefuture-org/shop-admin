import { put, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import {
  addSlides,
  deleteSlides,
  fetchedSlides,
  updateSlides,
  updateSlideVisibility,
} from './services/slides.service';
import { loadSlides, addSlide, deleteSlide, updateSlide, loadSlidesError } from '../actions/slides.actions';
import { IActions } from '../../interfaces/actions';
import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';

export function* fetchSlideWorker({ data: { page, limit, sort, sortDirect } }: IActions): SagaIterator {
  try {
    const slidesData = yield call(fetchedSlides, page, limit, sort, sortDirect);
    yield put(loadSlides(slidesData));
  } catch (error) {
    yield put(loadSlidesError(error?.message));
    yield put(failSnackBar(error?.message));
  }
}

export function* addSlideWorker({ data }: IActions): SagaIterator {
  try {
    const newSlide = yield call(addSlides, data);
    yield put(addSlide(newSlide));
  } catch (error) {}
}

export function* deleteSlideWorker({ data }: IActions): SagaIterator {
  try {
    yield call(deleteSlides, data);
    yield put(deleteSlide(data));
  } catch (error) {}
}

export function* updateSlideWorker({ data }: IActions): SagaIterator {
  try {
    const newSlide = yield call(updateSlides, data);
    yield put(updateSlide(newSlide));
    yield put(successSnackBar());
  } catch (error) {}
}

export function* updateSlideVisibilityWorker({ data }: IActions): SagaIterator {
  try {
    const newSlide = yield call(updateSlideVisibility, data);
    yield put(updateSlide(newSlide));
  } catch (error) {}
}
