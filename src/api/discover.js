import axios from 'axios';
import apiKey from './api-key';

const baseUrl = 'https://api.themoviedb.org/3';

function getMovies(params) {

  const requestParams = {
    ...params,
    api_key: apiKey,
  };

  return axios.get(baseUrl + '/discover/movie', {
    params: requestParams
  }).then(response => response.data).catch(error => error.response.data);
}
// https://api.themoviedb.org/3/discover/movie?api_key=4a40546ef054e972565ad0057d13410f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2
export { getMovies };