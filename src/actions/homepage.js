// @flow
import * as Actions from '../constants/ActionTypes';
import { getMovies }from '../api/discover';

// actions
export type IncrementAction = {
  type: typeof Actions.INCREMENT
}

export type AddAction = {
  type: typeof Actions.ADD,
  payload: number
}

export type GetMovieAction = {
  type: typeof Actions.GET_MOVIES,
  payload: object
}

export type GetMovieSuccessAction = {
  type: typeof Actions.GET_MOVIES_SUCESS,
  payload: object
}

export type GetMovieFailAction = {
  type: typeof Actions.GET_MOVIES_FAIL,
  payload: object
}

export type CounterAction =
  | IncrementAction
  | AddAction
  | GetMovieAction
  | GetMovieSuccessAction
  | GetMovieFailAction

export function increment() {
  return { type: Actions.INCREMENT }
}

export function add(n: number) {
  return { type: Actions.ADD, payload: n }
}

export function getMovie() {
  return {
    type: Actions.GET_MOVIES,
    payload: getMovies()
  };
}


export const homepageActionCreators = {
  increment,
  add,
  getMovie
};