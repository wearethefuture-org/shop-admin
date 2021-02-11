import { IActions } from "../../interfaces/actions";
import {
  REQUEST_PRODUCTS,
  LOAD_PRODUCTS,
  REQUEST_ADD_PRODUCT,
  ADD_PRODUCT,
  REQUEST_UPDATE_PRODUCT,
  UPDATE_PRODUCT,
  REQUEST_DELETE_PRODUCT,
  DELETE_PRODUCT,
  REQUEST_UPLOAD_IMAGES_PRODUCT
} from "../types";
import { IProductsData } from '../../interfaces/IProducts';


const data: IProductsData = {
  list: [],
  loading: false
};

const products = (state = data, action: IActions) => {
  switch (action.type) {
    case REQUEST_PRODUCTS: {
      return {
        ...state,
        loading: true,
      }
    }
    case LOAD_PRODUCTS: {
      return {
        ...state,
        list: action.data,
        loading: false,
      }
    }
    case REQUEST_ADD_PRODUCT: {
      return {
        ...state,
        loading: true,
      }
    }
    case ADD_PRODUCT: {
      return {
        list: [
          ...state.list,
          action.data],
        loading: false
      }
    }
    case REQUEST_UPDATE_PRODUCT: {
      return {
        ...state,
        loading: true,
      }
    }
    case UPDATE_PRODUCT: {
      const productId = action.data.id;
      const itemIndex = state.list.findIndex(({ id }) => id === productId);
      return {
        ...state,
        list: [
          ...state.list.slice(0, itemIndex),
          action.data,
          ...state.list.slice(itemIndex + 1)
        ],
        loading: false,
      }
    }
    case REQUEST_DELETE_PRODUCT: {
      return {
        ...state,
        loading: true,
      }
    }
    case DELETE_PRODUCT: {

      return {
        ...state,
        list: [...state.list.filter((item) => item.id !== action.data)],
        loading: false,
      }
    }
    case REQUEST_UPLOAD_IMAGES_PRODUCT: {
      return {
        ...state,
        loading: true,

      }
    }
    default:
      return state;
  }
};

export default products;
