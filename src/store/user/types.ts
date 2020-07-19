export const Actions = {
  LOGOUT: 'LOGOUT',
  USER_SET_NAME: 'USER_SET_NAME',
  USER_SET_EMAIL: 'USER_SET_EMAIL',
  USER_SET_USER: 'USER_SET_USER',
  USER_GET_USER: 'USER_GET_USER',
}
export type ActionTypes =
  | { type: 'LOGOUT' }
  | { type: 'USER_SET_NAME'; name: string }
  | { type: 'USER_SET_EMAIL'; email: string }
  | { type: 'USER_SET_USER'; payload: UserState }
  | { type: 'USER_GET_USER'; userId: number }

export type UserState = {
  email: string
  name: string
  username: string
  avatar?: string
}
