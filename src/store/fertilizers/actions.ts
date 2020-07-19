import { ActionTypes, FertilizersState } from './types'

export function setFertilizers(fertilizers: FertilizersState[]): ActionTypes {
  return { type: 'FERTILIZERS_SET_FERTILIZERS', fertilizers }
}
export function getFertilizers(): ActionTypes {
  return { type: 'FERTILIZERS_GET_FERTILIZERS' }
}
