import { IActions } from "../../interfaces/actions";
import { LOAD_USERS, ADD_USER, DELETE_USER } from "../types";
import { IUsersData } from "../../interfaces/Users";


const data: IUsersData = {
  list: []
};

const users = (state = data, action: IActions) => {
  switch (action.type) {
    case LOAD_USERS: {
      return {...state, list: action.data}
    }
    case ADD_USER: {
      return {...state, list: [...state.list, action.data]}
    }
    case DELETE_USER: {
      return {...state, list: [...state.list, action.data]}
    }
    default:
      return state;
  }
};

export default users;