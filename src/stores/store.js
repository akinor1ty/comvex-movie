import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers/index';
import promiseMiddleware from 'redux-promise';
import logger from 'redux-logger';

export default createStore(reducers, applyMiddleware(promiseMiddleware, logger));
