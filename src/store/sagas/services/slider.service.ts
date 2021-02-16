import { api } from '../../../api/api';
import {IActions, IActionsImage} from '../../../interfaces/actions';

export async function fetchedSliders () {
    const sliders = await api.sliders.get();
    return sliders.data;
}

export async function addSliders (data: IActionsImage) {
    const newSlider =  await api.sliders.add(data);
    return newSlider.data;
}

export async function updateSliders (data: IActionsImage) {
    const newSlider =  await api.sliders.update(data);
    return newSlider.data;
}

export async function deleteSliders (data: IActionsImage) {
    const deleteSlider =  await api.sliders.delete(data);
    console.log(deleteSlider, deleteSlider.data);
    return deleteSlider;
}
