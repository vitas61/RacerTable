import {getDrivers} from '../service/RestApi';
import {fetchStart, fetchSuccess, fetchError} from './drivers.actions';

const _loadDrivers = (limit, offset) => dispatch => {
  dispatch(fetchStart());
  getDrivers(limit, offset).then(function(response) {
    if (response.error === 0) {
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
