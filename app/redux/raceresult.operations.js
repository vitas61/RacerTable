import {getRaceResults} from '../service/RestApi';
import {fetchStart, fetchError, fetchSuccess} from './raceresult.actions';

const _loadRaceResult = (driverId, limit, offset) => dispatch => {
  dispatch(fetchStart());
  getRaceResults(driverId, limit, offset).then(function(response) {
    if (response.error === 0) {
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
