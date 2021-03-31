import { INITIALIZE_ROUT_HISTORY, ROUTING_TO } from '../types';
import { IActions } from '../../interfaces/actions';

interface IRouting {
  history: Array<any>;
}

const initialState: IRouting = {
  history: [],
};

export const userReducer = (state = initialState, { type, data }: IActions) => {
  switch (type) {
    case INITIALIZE_ROUT_HISTORY:
      return {
        ...state,
        history: data,
      };
    case ROUTING_TO:
      state.history.push(data);
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default userReducer;
