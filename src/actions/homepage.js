// @flow
import Actions from '../constants/ActionTypes';

export type IncrementAction = {
  type: typeof Actions.INCREMENT
}

export type AddAction = {
  type: typeof Actions.ADD,
  payload: number
}

export type CounterAction = IncrementAction | AddAction

export function increment(): IncrementAction {
  return { type: Actions.INCREMENT }
}

export async function incrementAsync(): Promise<IncrementAction> {
  return { type: Actions.INCREMENT }
}

export function add(n: number): AddAction {
  return { type: Actions.ADD, payload: n }
}
