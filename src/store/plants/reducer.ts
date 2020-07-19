import { ActionTypes, PlantsState } from './types'

const initialState: PlantsState[] = []

export default (state = initialState, action: ActionTypes): PlantsState[] => {
  switch (action.type) {
    case 'LOGOUT':
      return initialState
    case 'PLANTS_SET_PLANTS':
      return action.plants
    default:
      return state
  }
}
