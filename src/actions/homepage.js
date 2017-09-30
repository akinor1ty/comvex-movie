// @flow
import * as Actions from '../constants/ActionTypes';

// actions
export type IncrementAction = {
  type: typeof Actions.INCREMENT
}

export type AddAction = {
  type: typeof Actions.ADD,
  payload: number
}

export type CounterAction =
  | IncrementAction
  | AddAction


export function increment() {
  return { type: Actions.INCREMENT }
}

export function add(n: number) {
  return { type: Actions.ADD, payload: n }
}
