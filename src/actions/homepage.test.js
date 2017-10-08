import *  as ActionTypes from '../constants/ActionTypes';
import * as actionCreators from './homepage';
import assert from 'power-assert';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const deepEqual = assert.deepEqual;

describe('Sync action', () => {
  it('should create an action to set sorting', () => {
    const actual = actionCreators.setSorting('test');
    deepEqual(actual, { type: ActionTypes.SET_SORTING, value: 'test' });
  });

  it('should create an action to set filtering', () => {
    const actual = actionCreators.setFiltering('test');
    deepEqual(actual, { type: ActionTypes.SET_FILTERING, value: 'test' });
  });

  it('should create an action to set search query', () => {
    const actual = actionCreators.setSearchQuery('test');
    deepEqual(actual, { type: ActionTypes.SET_SEARCH_QUERY, searchQuery: 'test' });
  });
});

describe('Async actions', () => {


  describe('Get movies action', () => {
    beforeEach(() => {
      moxios.install()
    });

    afterEach(() => {
      moxios.uninstall()
    });

    it('should create actions to set fetched movies and genres', () => {
      moxios.stubRequest(/.*\/discover\/movie.*/, {
        status: 200,
        response: {
          page: 1,
          results: []
        }
      });

      const expected = [
        { type: ActionTypes.GET_MOVIES_SUCCESS, payload: { page: 1, results: [] } }
      ];
      const store = mockStore({ homepage: { sortBy: null, genres: [], filterWith: null }});

      return store.dispatch(actionCreators.getMovie())
        .then(() => deepEqual(store.getActions(), expected))
    });
  });

  describe('Search movies action', () => {
    beforeEach(() => {
      moxios.install()
    });

    afterEach(() => {
      moxios.uninstall()
    });

    it('should create actions to set fetched movies and genres', () => {

      moxios.stubRequest(/.*\/search\/movie.*/, {
        status: 200,
        response: {
          page: 1,
          results: []
        }
      });

      const expected = [
        {type: ActionTypes.SEARCH_MOVIES_SUCCESS, payload: {page: 1, results: []}}
      ];
      const store = mockStore({homepage: {sortBy: null, genres: [], filterWith: null}});

      return store.dispatch(actionCreators.searchMovies())
        .then(() => deepEqual(store.getActions(), expected))
    });
  });
  describe('Get genres', () => {
    it('should create an action to set fetched genres', () => {

      moxios.stubRequest(/.*\/movie\/list.*/, {
        status: 200,
        response: {
          genres: []
        }
      });
      const expected = [
        { type: ActionTypes.GET_GENRES_SUCCESS, data: { genres: [] } },
      ];
      const store = mockStore({homepage: {sortBy: null, genres: [], filterWith: null}});

      return store.dispatch(actionCreators.getGenres())
        .then(() => assert(store.getActions(), expected))
    });
  });
});