// @flow
import *  as ActionTypes from '../constants/ActionTypes';
import * as actionCreators from './details';
import assert from 'power-assert';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const deepEqual = assert.deepEqual;

describe('Async actions', () => {

  describe('Get movie details action', () => {

    beforeEach(() => {
      moxios.install()
    });

    afterEach(() => {
      moxios.uninstall()
    });

    it('should create actions to set fetched movies details', () => {
      moxios.stubRequest(/.*\/movie\/1/, {
        status: 200,
        response: {
          details: {}
        }
      });

      const expected = [
        { type: ActionTypes.GET_DETAILS_SUCCESS, data: { details: {} } }
      ];
      const store = mockStore();

      return store.dispatch(actionCreators.getDetails(1))
        .then(() => deepEqual(store.getActions(), expected))
    });

    it('should create actions to set fetched images', () => {
      moxios.stubRequest(/.*\/movie\/550\/images/, {
        status: 200,
        response: {
          backdrops: [],
        }
      });

      const expected = [
        { type: ActionTypes.GET_IMAGES_SUCCESS, data: { backdrops: [] } }
      ];
      const store = mockStore();

      return store.dispatch(actionCreators.getImages(550))
        .then(() => deepEqual(store.getActions(), expected))
    });

    it('should create actions to set fetched cast data', () => {
      moxios.stubRequest(/.*\/movie\/1\/credits/, {
        status: 200,
        response: {
          cast: [],
        }
      });

      const expected = [
        { type: ActionTypes.GET_CASTS_SUCCESS, data: { cast: [] } }
      ];
      const store = mockStore();

      return store.dispatch(actionCreators.getCasts(1))
        .then(() => deepEqual(store.getActions(), expected))
    });
  });


});