// @flow
import  Actions from '../constants/ActionTypes';
import type CounterAction from '../actions/homepage';

type CounterState = { value: number }

export default (state: CounterState = { value: 0 }, action: CounterAction) => {

  switch(action.type) {

    case Actions.INCREMENT:
      console.log(action.payload) //failed
      return { value: state.value + 1 }

    case Actions.ADD:
      return { value: state.value + action.payload }
  }
}
