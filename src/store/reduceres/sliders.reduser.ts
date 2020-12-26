import { IActions } from "../../interfaces/actions";
import {ADD_SLIDER, DELETE_SLIDER, LOAD_SLIDERS} from "../types";
import { ISlidersData } from '../../interfaces/sliders-data';
import {act} from "react-dom/test-utils";


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
        default:
            return state;
    }
};

export default sliders;
