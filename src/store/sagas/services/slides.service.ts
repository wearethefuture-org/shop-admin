import { api } from '../../../api/api';
import { IActionsImage } from '../../../interfaces/actions';
import { ISlideUpdateValues, ISlideVisibility } from "../../../interfaces/ISlides";

export async function fetchedSlides () {
    const slides = await api.slides.get();
    return slides.data;
}

export async function addSlides (data: FormData) {
    const newSlide =  await api.slides.add(data);
    return newSlide.data;
}

export async function updateSlides (data: ISlideUpdateValues) {
    const newSlide =  await api.slides.update(data);
    return newSlide.data;
}

export async function updateSlideVisibility (data: ISlideVisibility) {
    const newSlide =  await api.slides.updateVisibility(data);
    return newSlide.data;
}

export async function deleteSlides (data: IActionsImage) {
    const deleteSlide =  await api.slides.delete(data);
    return deleteSlide;
}
