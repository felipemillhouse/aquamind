import { ActionTypes, UserState } from './types'

export function setName(name: string): ActionTypes {
  return { type: 'USER_SET_NAME', name }
}

export function setEmail(email: string): ActionTypes {
  return { type: 'USER_SET_EMAIL', email }
}

export function setUser(payload: UserState): ActionTypes {
  return { type: 'USER_SET_USER', payload }
}

export function getUser(userId: number): ActionTypes {
  return { type: 'USER_GET_USER', userId }
}

export function logout(): ActionTypes {
  return { type: 'LOGOUT' }
}
