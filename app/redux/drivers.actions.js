import {getDrivers} from '../service/RestApi';

export const ACTION_FETCH_START = 'FETCH_START';
export const ACTION_FETCH_SUCCESS = 'FETCH_SUCCESS';
export const ACTION_FETCH_ERROR = 'FETCH_ERROR';

export const fetchStart = () => {
  return {
    type: ACTION_FETCH_START,
  };
};
export const fetchError = () => {
  return {
    type: ACTION_FETCH_ERROR,
  };
};

export const fetchSuccess = (drivers, total, limit, offset) => {
  return {
    type: ACTION_FETCH_SUCCESS,
    drivers,
    total,
    limit,
    offset,
  };
};

