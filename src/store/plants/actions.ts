import { ActionTypes, PlantsState } from './types'

export function setPlants(plants: PlantsState[]): ActionTypes {
  return { type: 'PLANTS_SET_PLANTS', plants }
}
export function getPlants(): ActionTypes {
  return { type: 'PLANTS_GET_PLANTS' }
}
