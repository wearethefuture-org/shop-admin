import {put, call} from 'redux-saga/effects';
import {
    addSlides,
    deleteSlides,
    fetchedSlides,
    updateSlides,
    updateSlideVisibility
} from './services/slides.service';
import { loadSlides, addSlide, deleteSlide, updateSlide, failSnackBar, successSnackBar } from '../actions';
import {SagaIterator} from 'redux-saga';
import {IActions} from '../../interfaces/actions';


export function* fetchSlideWorker(): SagaIterator {
    try {
        const slidesData = yield call(fetchedSlides);
        yield put(loadSlides(slidesData));
    } catch (error) {
        yield put(failSnackBar(error.message));
        console.log(error);
    }
}

export function* addSlideWorker({data}: IActions): SagaIterator {
    try {
        const newSlide = yield call(addSlides, data);
        yield put(addSlide(newSlide));
    } catch (error) {
        console.log(error);
    }
}

export function* deleteSlideWorker({data}: IActions): SagaIterator {
    try {
        yield call(deleteSlides, data);
        yield put(deleteSlide(data));
    } catch (error) {
        console.log(error);
    }
}

export function* updateSlideWorker({data}: IActions): SagaIterator {
    try {
        const newSlide = yield call(updateSlides, data);
        yield put(updateSlide(newSlide));
        yield put(successSnackBar());
    } catch (error) {
        console.log(error);
    }
}

export function* updateSlideVisibilityWorker({data}: IActions): SagaIterator {
    try {
        const newSlide = yield call(updateSlideVisibility, data);
        yield put(updateSlide(newSlide));
    } catch (error) {
        console.log(error);
    }
}
