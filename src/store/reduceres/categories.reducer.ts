import { IActions } from "../../interfaces/actions";
import { LOAD_CATEGORIES } from "../types";
import { ICategoriesData } from '../../interfaces/categories-data';


const data: ICategoriesData = {};

const categories = (state = data, action: IActions) => {
  switch (action.type) {
    case LOAD_CATEGORIES: {
      return {...state, list: action.data}
    }
    default:
      return state;
  }
};

export default categories;
