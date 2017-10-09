// @flow
import * as Actions from '../constants/ActionTypes';
import { fetchMovies, fetchImages, fetchCasts } from '../api/discover';
import type { Dispatch, GetState } from 'redux-thunk';

export function getDetailsSuccess(data: any) {
  return { type: Actions.GET_DETAILS_SUCCESS, data: data }
}

export function getImagesSuccess(data: any) {
  return { type: Actions.GET_IMAGES_SUCCESS, data: data }
}

export function getCastsSuccess(data: any) {
  return { type: Actions.GET_CASTS_SUCCESS, data: data }
}


export function getDetails(id) {
  return (dispatch: Dispatch) => fetchMovies(id)
    .then(response => response.data)
    .then(data => dispatch(getDetailsSuccess(data)))
    .catch(error => console.error(error));
}

export function getImages(id) {
  return (dispatch: Dispatch) => fetchImages(id)
    .then(response => response.data)
    .then(data => dispatch(getImagesSuccess(data)))
    .catch(error => console.error(error));
}

export function getCasts(id) {
  return (dispatch: Dispatch) => fetchCasts(id)
    .then(response => response.data)
    .then(data => dispatch(getCastsSuccess(data)))
    .catch(error => console.error(error));
}

export const detailsActionCreators = {
  getDetails, getImages, getCasts
};