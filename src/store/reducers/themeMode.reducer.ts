import { IActions } from "../../interfaces/actions";
import { SWITCH_DARK_MODE } from "../types";


const initialState = {
  darkMode: false
}

const themeMode = (state = initialState, action: IActions) => {
  switch (action.type) {
    case SWITCH_DARK_MODE:
      if (!state.darkMode) localStorage.setItem('darkMode', String(true))
      else localStorage.removeItem('darkMode')
      return { ...state, darkMode: !state.darkMode }

    default: return state;
  }
};

export default themeMode;