import { api } from '../../../api/api';
import { IActionsImage } from '../../../interfaces/actions';
import { ISliderUpdateValues, ISliderVisibility } from "../../../interfaces/ISliders";

export async function fetchedSliders () {
    const sliders = await api.sliders.get();
    return sliders.data;
}

export async function addSliders (data: FormData) {
    const newSlider =  await api.sliders.add(data);
    return newSlider.data;
}

export async function updateSliders (data: ISliderUpdateValues) {
    const newSlider =  await api.sliders.update(data);
    return newSlider.data;
}

export async function updateSliderVisibility (data: ISliderVisibility) {
    const newSlider =  await api.sliders.updateVisibility(data);
    return newSlider.data;
}

export async function deleteSliders (data: IActionsImage) {
    const deleteSlider =  await api.sliders.delete(data);
    return deleteSlider;
}
