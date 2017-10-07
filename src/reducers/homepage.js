// @flow
import * as ActionsTypes from '../constants/ActionTypes';
import type { CounterAction } from '../actions/homepage';

type Movie = {
  backdrop_path: string,
}
type HomeState = {
  movies: Array<Movie>,
}

const initialState: HomeState = {
  movies: []
};

export default (state: HomeState = initialState, action: CounterAction) => {

  switch(action.type) {

    case ActionsTypes.GET_MOVIES:
      const { payload } = action;

      return {
        ...state,
        movies: payload.results
      };

    default:
      return state;
  }
}
