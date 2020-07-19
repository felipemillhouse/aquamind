import { ActionTypes, TanksState } from './types'

const initialState: TanksState[] = []

export default (state = initialState, action: ActionTypes): TanksState[] => {
  switch (action.type) {
    case 'LOGOUT':
      return initialState
    case 'TANKS_SET_TANKS':
      return action.tanks
    default:
      return state
  }
}
