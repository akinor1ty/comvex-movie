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

function fetchMovies(id) {
  return axios.get(`${baseUrl}/movie/${id}`, {
    params: {
      api_key: apiKey,
    }
  });
}

function fetchImages(id) {
  return axios.get(`${baseUrl}/movie/${id}/images`, {
    params: {
      api_key: apiKey,
    }
  });
}

function fetchCasts(id) {
  return axios.get(`${baseUrl}/movie/${id}/credits`, {
    params: {
      api_key: apiKey,
    }
  });
}

export {
  getMoviesRequest, getGenresRequest, searchMoviesRequest,
  fetchMovies, fetchImages, fetchCasts,
};