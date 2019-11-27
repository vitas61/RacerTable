import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://ergast.com/',
});

export const getDrivers = (limit = 10, offset = 0) => {
  return _getContent('/api/f1/drivers.json', {
    limit,
    offset,
  });
};

export const getRaceResults = (driverId, limit = 10, offset = 0) => {
  return _getContent(`/api/f1/drivers/${driverId}/results.json`, {
    limit,
    offset,
  });
};

const _getContent = async (url, params = {}) => {
  try {
    const response = await axiosClient({
      method: 'get',
      timeout: 10000,
      url,
      params,
    });
    return {
      error: 0,
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      return {
        error: 1,
        status: error.response.status,
      };
    } else {
      return {
        error: 2,
        status: 0,
      };
    }
  }
};
