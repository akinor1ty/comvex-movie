// @flow
import * as ActionsTypes from '../constants/ActionTypes';
import type { CounterAction } from '../actions/homepage';
import type { Movie } from '../types/home';

type ResultMovie = {
  id: number,
  original_title: string,
  poster_path: string,
  genre_ids: Array<number>,
  vote_average: number,
  popularity: number,
}


type HomeState = {
  page: number,
  movies: Array<Movie>,
  genres: Array<{ id: number, name: string}>
}

const initialState: HomeState = {
  page: 0,
  movies: [],
  genres: [],
  sortOptions: [
    { value: 'original_title.asc', label: 'Title' },
    { value: 'release_date.desc', label: 'Release date' },
    { value: 'vote_average.desc', label: 'Vote average' },
    { value: 'popularity.desc', label: 'Popularity' },
  ],
  sortBy: 'original_title.asc',
  filterWith: -1,
  searchQuery: null,
  searching: false,
};

function mapMovies(results: Array<ResultMovie>, genres: Array<any>) {

  return results.map(r => ({
      id: r.id,
      title: r.original_title,
      posterPath: r.poster_path,
      genres: r.genre_ids.filter(id => genres.map(g => g.id).includes(id)).map(id => genres.find(g => g.id === id)),
      voteAverage: r.vote_average,
      popularity: r.popularity,
    })
  );
}

export default (state: HomeState = initialState, action: CounterAction) => {

  switch(action.type) {

    case ActionsTypes.GET_GENRES_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        genres: [
          { id: -1, name: 'All Genre' },
          ...data.genres
        ]
      };
    }

    case ActionsTypes.GET_MOVIES_SUCCESS: {
      const { page, results } = action.payload;
      const movies = mapMovies(results, state.genres);

      return {
        ...state,
        page,
        movies: page === 1 ? movies : [ ...state.movies, ...movies ],
      };
    }

    case ActionsTypes.SEARCH_MOVIES_SUCCESS: {
      const { page, results } = action.payload;
      const movies = mapMovies(results, state.genres);

      return {
        ...state,
        page,
        movies: page === 1 ? movies : [ ...state.movies, ...movies ],
      };
    }

    case ActionsTypes.SET_SORTING: {
      const { value } = action;
      return {
        ...state,
        page: 0,
        sortBy: value,
        searching: false,
      };
    }
    case ActionsTypes.SET_FILTERING: {
      const { value } = action;
      return {
        ...state,
        page: 0,
        filterWith: value,
        searching: false,
      };
    }
    case ActionsTypes.SET_SEARCH_QUERY: {
      const { searchQuery } = action;
      return {
        ...state,
        page: 0,
        searchQuery: searchQuery,
        searching: true,
      }
    }

    default: {
      return state;
    }
  }
}
