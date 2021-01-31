import { IActions } from "../../interfaces/actions";
import { ISettingsData } from "../../interfaces/ISettings";
import { LOAD_SETTINGS, UPDATE_SETTINGS } from "../types";

const data: ISettingsData = {
  list: [],
};

const settings = (state = data, action: IActions) => {
  switch (action.type) {
    case LOAD_SETTINGS: {
      return { ...state, list: action.data };
    }
    case UPDATE_SETTINGS: {
      return { ...state, list: action.data };
    }
    default:
      return state;
  }
};

export default settings;
