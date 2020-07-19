import { ActionTypes, UserState } from './types'

const initialState: UserState = {
  email: '',
  name: '',
  username: '',
  avatar: '',
}

export default (state = initialState, action: ActionTypes): UserState => {
  switch (action.type) {
    case 'LOGOUT':
      return initialState
    case 'USER_SET_NAME':
      return { ...state, name: action.name }
    case 'USER_SET_EMAIL':
      return { ...state, email: action.email }
    case 'USER_SET_USER':
      return action.payload
    default:
      return state
  }
}
