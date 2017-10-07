import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers/index';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

export default createStore(reducers, applyMiddleware(thunkMiddleware, logger));
