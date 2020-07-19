export const Actions = {
  FERTILIZERS_GET_FERTILIZERS: 'FERTILIZERS_GET_FERTILIZERS',
  FERTILIZERS_SET_FERTILIZERS: 'FERTILIZERS_SET_FERTILIZERS',
}
export type ActionTypes =
  | { type: 'LOGOUT' }
  | { type: 'FERTILIZERS_GET_FERTILIZERS' }
  | { type: 'FERTILIZERS_SET_FERTILIZERS'; fertilizers: FertilizersState[] }

export type FertilizersState = {
  id: number
  name: string
  photo?: string[]
  description?: string
}
