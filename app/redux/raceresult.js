import {getRaceResults} from '../service/RestApi';

const ACTION_FETCH_START = 'FETCH_RR_START';
const ACTION_FETCH_SUCCESS = 'FETCH_RR_SUCCESS';
const ACTION_FETCH_ERROR = 'FETCH_RR_ERROR';
const ACTION_RESET = 'RR_RESET';

const INIT_STATE = {
  data: [],
  driverId: '',
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

export const raceResultState = (
  state = {
    ...INIT_STATE,
  },
  action,
) => {
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
        data: action.races,
        total: action.total,
        limit: action.limit,
        offset: action.offset,
        driverId: action.driverId,
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
    case ACTION_RESET:
      return {
        ...INIT_STATE,
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

const fetchSuccess = (races, total, limit, offset, driverId) => {
  return {
    type: ACTION_FETCH_SUCCESS,
    races,
    total,
    limit,
    offset,
    driverId,
  };
};

const _loadRaceResult = (driverId, limit, offset) => dispatch => {
  dispatch(fetchStart());
  getRaceResults(driverId, limit, offset).then(function(response) {
    if (response.error === 0) {
      //console.log(response.data);
      const {
        MRData: {
          RaceTable: {Races = []} = {},
          total = 0,
          limit = 0,
          offset = 0,
        } = {},
      } = response.data || {};
      dispatch(
        fetchSuccess(
          Races,
          parseInt(total, 10),
          parseInt(limit, 10),
          parseInt(offset, 10),
          driverId,
        ),
      );
    } else {
      dispatch(fetchError());
    }
  });
};

export const reset = () => {
  return {
    type: ACTION_RESET,
  };
};

export const nextRaceResultThunk = () => (dispatch, getState) => {
  const {
    raceResultState: {total, limit, offset, driverId},
  } = getState();
  if (limit + offset < total) {
    dispatch(_loadRaceResult(driverId, limit, limit + offset));
  }
};

export const prevRaceResultThunk = () => (dispatch, getState) => {
  const {
    raceResultState: {limit, offset, driverId},
  } = getState();
  if (offset >= limit) {
    dispatch(
      _loadRaceResult(driverId, limit, offset - limit < 0 ? 0 : offset - limit),
    );
  }
};

export const loadRaceResultThunk = driverId => (dispatch, getState) => {
  const {
    raceResultState: {limit, offset},
  } = getState();
  dispatch(_loadRaceResult(driverId, limit, offset));
};
