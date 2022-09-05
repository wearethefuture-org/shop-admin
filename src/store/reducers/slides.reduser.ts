import { LOAD_SLIDES_ERROR } from './../types';
import { IActions } from '../../interfaces/actions';
import { ADD_SLIDE, DELETE_SLIDE, LOAD_SLIDES, REQUEST_SLIDES, UPDATE_SLIDE } from '../types';
import { ISlidesData } from '../../interfaces/ISlides';

const data: ISlidesData = {
  list: [],
  loading: false,
  error: null,
  count: 0,
  totalPages: 0,
  paginationPage: 1,
  paginationLimit: 10,
  sort: 'id',
  sortDirect: 'asc',
};

const slides = (state = data, action: IActions): ISlidesData => {
  switch (action.type) {
    case LOAD_SLIDES: {
      return {
        ...state,
        list: action.data.data,
        count: action.data.count,
        totalPages: action.data.totalPages,
        loading: false,
      };
    }
    case LOAD_SLIDES_ERROR: {
      return { ...state, error: action.data, loading: false };
    }
    case REQUEST_SLIDES: {
      return {
        ...state,
        loading: true,
        error: null,
        paginationPage: action.data.page,
        paginationLimit: action.data.limit,
        sort: action.data.sort,
        sortDirect: action.data.sortDirect,
      };
    }
    case ADD_SLIDE: {
      return { ...state, list: [...state.list, action.data] };
    }
    case DELETE_SLIDE: {
      return { ...state, list: [...state.list.filter((x) => x.id !== action.data.id)] };
    }
    case UPDATE_SLIDE: {
      return { ...state, list: [...state.list.map((x) => (x.id === action.data.id ? action.data : x))] };
    }
    default:
      return state;
  }
};

export default slides;
