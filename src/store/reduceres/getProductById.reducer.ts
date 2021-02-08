import { IActions } from "../../interfaces/actions";
import { LOAD_PRODUCT_BY_ID, REQUEST_PRODUCT_BY_ID } from "../types";
import { IProductItem } from '../../interfaces/IProducts';


const data: IProductItem = {
    id: 0,
    createdAt: '',
    updatedAt: '',
    name: '',
    price: 0,
    description: '',
    category: {},
    file: []
};


const getProductById = (state = data, action: IActions) => {
    switch (action.type) {
        case REQUEST_PRODUCT_BY_ID: {
            return { ...state, ...data }
        }

        case LOAD_PRODUCT_BY_ID: {
            return { ...state, ...action.data }
        }
        default:
            return state;
    }
};

export default getProductById;