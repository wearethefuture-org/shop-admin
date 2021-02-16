import { IActions } from "../../interfaces/actions";
import {ADD_SLIDER, DELETE_SLIDER, LOAD_SLIDERS, UPDATE_SLIDER} from "../types";
import { ISlidersData } from '../../interfaces/ISliders';

const data: ISlidersData = {
    list: []
};

const sliders = (state = data, action: IActions) => {
    switch (action.type) {
        case LOAD_SLIDERS: {
            return {...state, list: action.data}
        }
        case ADD_SLIDER: {
            return {...state, list: [...state.list, action.data]}
        }
        case DELETE_SLIDER: {
            return {...state, list: [...state.list.filter(x => x.id !== action.data.id)]}
        }
        case UPDATE_SLIDER: {
            return {...state, list: [...state.list.map(x => x.id === action.data.id?action.data:x)]}
        }
        default:
            return state;
    }
};

export default sliders;
