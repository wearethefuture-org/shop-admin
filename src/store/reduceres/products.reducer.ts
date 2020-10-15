import { IActions } from "../../interfaces/actions";
import { LOAD_PRODUCTS } from "../types";
import { IProductsData } from '../../interfaces/IProducts';


const data: IProductsData = {};

const products = (state = data, action: IActions) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      return { ...state, list: action.data }
    }
    default:
      return state;
  }
};

export default products;
