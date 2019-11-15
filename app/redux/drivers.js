import {getDrivers} from '../service/RestApi';

const ACTION_FETCH_START = 'FETCH_START';
const ACTION_FETCH_SUCCESS = 'FETCH_SUCCESS';
const ACTION_FETCH_ERROR = 'FETCH_ERROR';

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

const fetchStart = () => {
  return {
    type: ACTION_FETCH_START,
  };
};
const fetchError = () => {
  return {
    type: ACTION_FETCH_ERROR,
  };
};

const fetchSuccess = (drivers, total, limit, offset) => {
  return {
    type: ACTION_FETCH_SUCCESS,
    drivers,
    total,
    limit,
    offset,
  };
};

const _loadDrivers = (limit, offset) => dispatch => {
  dispatch(fetchStart());
  getDrivers(limit, offset).then(function(response) {
    if (response.error === 0) {
      //console.log(response.data);
      const {
        MRData: {
          DriverTable: {Drivers = []} = {},
          total = 0,
          limit = 0,
          offset = 0,
        } = {},
      } = response.data || {};
      dispatch(
        fetchSuccess(
          Drivers,
          parseInt(total, 10),
          parseInt(limit, 10),
          parseInt(offset, 10),
        ),
      );
    } else {
      dispatch(fetchError());
    }
  });
};

export const nextDriversThunk = () => (dispatch, getState) => {
  const {
    driversState: {total, limit, offset},
  } = getState();
  if (limit + offset < total) {
    dispatch(_loadDrivers(limit, limit + offset));
  }
};

export const prevDriversThunk = () => (dispatch, getState) => {
  const {
    driversState: {limit, offset},
  } = getState();
  if (offset >= limit) {
    dispatch(_loadDrivers(limit, offset - limit < 0 ? 0 : offset - limit));
  }
};

export const loadDriversThunk = () => (dispatch, getState) => {
  const {
    driversState: {limit, offset},
  } = getState();
  dispatch(_loadDrivers(limit, offset));
};
