import { ActionTypes, FertilizersState } from './types'

const initialState: FertilizersState[] = []

export default (state = initialState, action: ActionTypes): FertilizersState[] => {
  switch (action.type) {
    case 'LOGOUT':
      return initialState
    case 'FERTILIZERS_SET_FERTILIZERS':
      return action.fertilizers
    default:
      return state
  }
}
