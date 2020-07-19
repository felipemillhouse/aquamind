import { ActionTypes, TanksState } from './types'

export function setTanks(tanks: TanksState[]): ActionTypes {
  return { type: 'TANKS_SET_TANKS', tanks }
}
export function getTanks(userId: number): ActionTypes {
  return { type: 'TANKS_GET_TANKS', userId }
}
