import { IActions } from "../../interfaces/actions";
import { ADD_CATEGORY, LOAD_CATEGORIES, LOAD_USERS, ADD_USER } from "../types";
import { IUsersData } from "../../interfaces/users-data";


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
    default:
      return state;
  }
};

export default users;