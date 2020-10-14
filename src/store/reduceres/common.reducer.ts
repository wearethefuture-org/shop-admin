import { IActions } from "../../interfaces/actions";
import { TOGGLE_MODAL } from "../types";
import { ICommonData } from '../../interfaces/common-data';


const data: ICommonData = {
   isModalOpened: false
};

const common = (state = data, action: IActions) => {
  switch (action.type) {
    case TOGGLE_MODAL: {
      return {...state, isModalOpened: action.data}
    }
    default:
      return state;
  }
};

export default common;
