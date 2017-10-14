// @flow
import * as Actions from '../constants/ActionTypes';
import { getMoviesRequest, getGenresRequest, searchMoviesRequest } from '../api/discover';
import type { Dispatch, GetState, Thunk } from 'redux-thunk';

export type GetMovieAction = {
  type: typeof Actions.GET_MOVIES,
}

export type GetMovieSuccessAction = {
  type: typeof Actions.GET_MOVIES_SUCCESS,
  payload: {
    results: Array<any>,
    page: number
  }
}

export type GetMovieFailAction = {
  type: typeof Actions.GET_MOVIES_FAIL,
}

export type CounterAction =
  | GetMovieAction
  | GetMovieSuccessAction
  | GetMovieFailAction

export function setSorting(value: string) {
  return { type: Actions.SET_SORTING, value}
}

export function setFiltering(value: string) {
  return { type: Actions.SET_FILTERING, value }
}

export function setSearchQuery(searchQuery: string) {
  return { type: Actions.SET_SEARCH_QUERY, searchQuery }
}

export function getGenresSuccess(data: any) {
  return { type: Actions.GET_GENRES_SUCCESS, data }
}

export function getGenresFail(error: any) {
  return { type: Actions.GET_GENRES_SUCCESS, error }
}

export function getMovieSuccess(data: { page: number, results: Array<any>}) {
  return { type: Actions.GET_MOVIES_SUCCESS, payload: data }
}

export function getMovieFail() {
  return { type: Actions.GET_MOVIES_FAIL }
}

export function searchMoviesSuccess(data: { results: Array<any> }) {
  return { type: Actions.SEARCH_MOVIES_SUCCESS, payload: data }
}

export function searchMoviesFail(error: any) {
  return { type: Actions.SEARCH_MOVIES_FAIL, error }
}

export function getGenres() {
  return (dispatch: Dispatch) => getGenresRequest()
    .then(response => response.data)
    .then(data => dispatch(getGenresSuccess(data)))
    .catch(error => console.error(error));
}

export function searchMovies() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { searchQuery } = getState().homepage;
    const params = {
      query: searchQuery
    };

    return searchMoviesRequest(params)
      .then(response => response.data)
      .then(data => dispatch(searchMoviesSuccess(data)))
      .catch(error => dispatch(searchMoviesFail(error)));
  }

}

export function getMovie() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { sortBy, filterWith, page } = getState().homepage;

    let params: {
      page: number,
      sort_by?: string,
      with_genres?: ?string
    } = {
      page: page + 1,
    };
    if(sortBy) {
      params.sort_by = sortBy;
    }
    if(filterWith !== -1) {
      params.with_genres = filterWith;
    }

    return getMoviesRequest(params)
      .then(response => response.data)
      .then(data => dispatch(getMovieSuccess(data)))
      .catch(error => dispatch(getMovieFail()));
  }
}


export const homepageActionCreators = {
  getMovie, setSorting, setFiltering, searchMovies, setSearchQuery, getGenres
};