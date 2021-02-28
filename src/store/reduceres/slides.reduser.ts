import { IActions } from "../../interfaces/actions";
import {ADD_SLIDE, DELETE_SLIDE, LOAD_SLIDES, UPDATE_SLIDE} from "../types";
import { ISlidesData } from '../../interfaces/ISlides';

const data: ISlidesData = {
    list: []
};

const slides = (state = data, action: IActions) => {
    switch (action.type) {
        case LOAD_SLIDES: {
            return {...state, list: action.data}
        }
        case ADD_SLIDE: {
            return {...state, list: [...state.list, action.data]}
        }
        case DELETE_SLIDE: {
            return {...state, list: [...state.list.filter(x => x.id !== action.data.id)]}
        }
        case UPDATE_SLIDE: {
            return {...state, list: [...state.list.map(x => x.id === action.data.id?action.data:x)]}
        }
        default:
            return state;
    }
};

export default slides;
