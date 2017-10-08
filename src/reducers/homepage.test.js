import reducer from './homepage';
import assert from 'power-assert';
import * as types from '../constants/ActionTypes';
const deepEqual = assert.deepEqual;

describe('homepage reducer', () => {
  it('should return initial state', () => {
    const expected = {
      page: 0,
      movies: [],
      genres: [],
      sortOptions: [
        { value: 'original_title.asc', label: 'Title' },
        { value: 'release_date.desc', label: 'Release date' },
        { value: 'vote_average.desc', label: 'Vote average' },
        { value: 'popularity.desc', label: 'Popularity' },
      ],
      sortBy: null,
      filterWith: null,
      searchQuery: null,
      searching: false,
    };
    deepEqual(reducer(undefined, {}), expected);
  });

  it('should set genres on success', () => {
    const action = {
      type: types.GET_GENRES_SUCCESS,
      data: {
        genres: ['test']
      }
    };
    deepEqual(reducer(undefined, action).genres, ['test']);
  });

  it('should set movies on success', () => {
    const action = {
      type: types.GET_MOVIES_SUCCESS,
      payload: {
        page: 2,
        results: [
          { id: 1, original_title: 'title1', poster_path: '/test', genre_ids: [1], vote_average: 1, popularity: 1},
          { id: 2, original_title: 'title1', poster_path: '/test', genre_ids: [2], vote_average: 1, popularity: 1},
        ]
      }
    };
    const state = {
      movies: [],
      genres: [
        {id: 1, name: 'genre1'},
        {id: 2, name: 'genre2'},
      ]
    };

    const expected = {
      page: 2,
      genres: [
        {id: 1, name: 'genre1'},
        {id: 2, name: 'genre2'},
      ],
      movies: [
        { id: 1, title: 'title1', posterPath: '/test', genres: [{ id: 1, name: 'genre1'}], voteAverage: 1, popularity: 1},
        { id: 2, title: 'title1', posterPath: '/test', genres: [{ id: 2, name: 'genre2'}], voteAverage: 1, popularity: 1}
      ],
    };
    const actual = reducer(state, action);
    assert(actual.page === 2, 'update page');
    deepEqual(actual, expected);
  });

  it('should set order', () => {
    const action = {
      type: types.SET_SORTING,
      value: 'test',
    };

    const actual = reducer(undefined, action);
    assert(actual.page === 0, 'page');
    assert(actual.sortBy === 'test', 'sortBy');
    assert(actual.searching === false);
  });

  it('should set filtering', () => {
    const action = {
      type: types.SET_FILTERING,
      value: 'test',
    };

    const actual = reducer(undefined, action);
    assert(actual.page === 0, 'page');
    assert(actual.filterWith === 'test', 'filterWith');
    assert(actual.searching === false);
  });

  it('should set filtering', () => {
    const action = {
      type: types.SET_SEARCH_QUERY,
      searchQuery: 'test',
    };

    const actual = reducer(undefined, action);
    assert(actual.page === 0, 'page');
    assert(actual.searchQuery === 'test', 'searchQuery');
    assert(actual.searching, 'searching');
  });

});