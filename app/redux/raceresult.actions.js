export const ACTION_FETCH_START = 'FETCH_RR_START';
export const ACTION_FETCH_SUCCESS = 'FETCH_RR_SUCCESS';
export const ACTION_FETCH_ERROR = 'FETCH_RR_ERROR';
export const ACTION_RESET = 'RR_RESET';

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

export const fetchSuccess = (races, total, limit, offset, driverId) => {
  return {
    type: ACTION_FETCH_SUCCESS,
    races,
    total,
    limit,
    offset,
    driverId,
  };
};

export const reset = () => {
  return {
    type: ACTION_RESET,
  };
};
