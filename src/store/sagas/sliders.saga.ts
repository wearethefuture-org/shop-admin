import { put, call } from 'redux-saga/effects';
import { addSliders, deleteSliders, fetchedSliders } from './services/slider.service';
import { loadSliders, addSlider, deleteSlider } from '../actions';
import { SagaIterator } from 'redux-saga';
import { IActions } from '../../interfaces/actions';


export function* fetchSliderWorker(): SagaIterator {
    try {
        const slidersData = yield call(fetchedSliders);
        yield put(loadSliders(slidersData));
    } catch (error) {
        console.log(error);
    }
}

export function* addSliderWorker({ data }: IActions): SagaIterator {
    try {
        const newSlider = yield call(addSliders, data);
        yield put(addSlider(newSlider));
    } catch (error) {
        console.log(error);
    }
}

export function* deleteSliderWorker({ data }: IActions): SagaIterator {
    try {
        const newSlider = yield call(deleteSliders, data);
        if(newSlider.status === 200) {
            yield put(deleteSlider(data));
        }
    } catch (error) {
        console.log(error);
    }
}
