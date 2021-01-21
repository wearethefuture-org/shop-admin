import { IActions } from "../../interfaces/actions";
import { LOAD_USERS, ADD_USER, DELETE_USER } from "../types";
import { IUsersData } from "../../interfaces/Users";


const data: IUsersData = {
  list: [
    {
      "id": 46,
      "createdAt": "1-1-2020",
      "updatedAt": "1-1-2020",
      "email": "123@gmail.com",
      "password": "123123",
      "role" : 'admin'
    },
    {
      "id": 49,
      "createdAt": "1-1-2020",
      "updatedAt": "1-1-2020",
      "email": "1234@gmail.com",
      "password": "123123",
      "role" : 'admin'
    },
    {
      "id": 41,
      "createdAt": "1-1-2020",
      "updatedAt": "1-1-2020",
      "email": "123@gmail.com",
      "password": "123123",
      "role" : 'admin'
    },
    {
      "id": 43,
      "createdAt": "1-1-2020",
      "updatedAt": "1-1-2020",
      "email": "1234@gmail.com",
      "password": "123123",
      "role" : 'admin'
    },
  ]
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