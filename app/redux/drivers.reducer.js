import {
  ACTION_FETCH_ERROR,
  ACTION_FETCH_START,
  ACTION_FETCH_SUCCESS,
} from './drivers.actions';

const INIT_STATE = {
  data: [],
  limit: 5,
  offset: 0,
  total: 0,
  loading: false,
  error: false,
  prev: false,
  next: false,
  currentPage: 1,
  countPage: 1,
};

export const driversState = (state = {...INIT_STATE}, action) => {
  switch (action.type) {
    case ACTION_FETCH_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ACTION_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.drivers,
        total: action.total,
        limit: action.limit,
        offset: action.offset,
        next: action.limit + action.offset < action.total,
        prev: action.offset > 0,
        currentPage: action.offset / action.limit + 1,
        countPage: Math.ceil(action.total / action.limit),
      };
    case ACTION_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
