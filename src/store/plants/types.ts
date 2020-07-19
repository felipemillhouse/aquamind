export const Actions = {
  PLANTS_GET_PLANTS: 'PLANTS_GET_PLANTS',
  PLANTS_SET_PLANTS: 'PLANTS_SET_PLANTS',
}
export type ActionTypes =
  | { type: 'LOGOUT' }
  | { type: 'PLANTS_GET_PLANTS' }
  | { type: 'PLANTS_SET_PLANTS'; plants: PlantsState[] }

export type PlantsState = {
  id: number
  name: string
  photo?: string[]
  description?: string
}
