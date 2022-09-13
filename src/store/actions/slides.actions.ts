import { IActions } from '../../interfaces/actions';
import { ISlideItem, ISlideUpdateValues, ISlideVisibility } from '../../interfaces/ISlides';
import {
  ADD_SLIDE,
  LOAD_SLIDES,
  REQUEST_SLIDES,
  REQUEST_ADD_SLIDES,
  REQUEST_UPDATE_SLIDES,
  UPDATE_SLIDE,
  REQUEST_DELETE_SLIDES,
  DELETE_SLIDE,
  REQUEST_UPDATE_SLIDE_VISIBILITY,
  LOAD_SLIDES_ERROR,
} from '../types';

export const loadSlides = (slides: ISlideItem[]): IActions => ({ type: LOAD_SLIDES, data: slides });
export const loadSlidesError = (err): IActions => ({ type: LOAD_SLIDES_ERROR, data: err });
export const fetchSlides = (page = 1, limit = 10, sort = 'id', sortDirect = 'asc'): IActions => ({
  type: REQUEST_SLIDES,
  data: { page, limit, sort, sortDirect },
});

// add slide
export const fetchAddSlides = (slide: FormData): IActions => ({
  type: REQUEST_ADD_SLIDES,
  data: slide,
});
export const addSlide = (slide: ISlideItem): IActions => ({
  type: ADD_SLIDE,
  data: slide,
});

// delete slide
export const fetchDeleteSlides = (slide: ISlideItem): IActions => ({
  type: REQUEST_DELETE_SLIDES,
  data: slide,
});
export const deleteSlide = (slide: ISlideItem): IActions => ({
  type: DELETE_SLIDE,
  data: slide,
});

// update slide
export const fetchUpdateSlides = (slide: ISlideUpdateValues): IActions => ({
  type: REQUEST_UPDATE_SLIDES,
  data: slide,
});
export const updateSlide = (slide: ISlideItem): IActions => ({
  type: UPDATE_SLIDE,
  data: slide,
});

// update visibility slide
export const fetchUpdateSlideVisibility = (slide: ISlideVisibility): IActions => ({
  type: REQUEST_UPDATE_SLIDE_VISIBILITY,
  data: slide,
});
