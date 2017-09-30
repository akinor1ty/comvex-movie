// @flow
import * as ActionsTypes from '../constants/ActionTypes';
import type { CounterAction } from '../actions/homepage';

type CounterState = { value: number }

export default (state: CounterState = { value: 0 }, action: CounterAction) => {

  switch(action.type) {

    case ActionsTypes.INCREMENT:
      return { value: state.value + 1 };

    case ActionsTypes.ADD:
      return { value: state.value + action.payload };

    default:
      return state;
  }
}
