import axios from 'axios';
import apiKey from './api-key';

const baseUrl = 'https://api.themoviedb.org/3';

function getMoviesRequest(params) {

  const requestParams = {
    ...params,
    api_key: apiKey,
  };

  return axios.get(baseUrl + '/discover/movie', {
    params: requestParams
  });
}

function getGenresRequest() {
  return axios.get(baseUrl + '/genre/movie/list', {
    params: {
      api_key: apiKey
    }
  });
}

function searchMoviesRequest(params) {
  return axios.get(baseUrl + '/search/movie', {
    params: {
      api_key: apiKey,
      ...params
    }
  });
}

export { getMoviesRequest, getGenresRequest, searchMoviesRequest };