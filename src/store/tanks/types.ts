export const Actions = {
  TANKS_GET_TANKS: 'TANKS_GET_TANKS',
  TANKS_SET_TANKS: 'TANKS_SET_TANKS',
}
export type ActionTypes =
  | { type: 'LOGOUT' }
  | { type: 'TANKS_GET_TANKS'; userId: number }
  | { type: 'TANKS_SET_TANKS'; tanks: TanksState[] }

export type TanksState = {
  id: number
  title: string
  comments: number
  likes: number
  photos: number
  coverImageURL?: string | null
  length: number
  width: number
  height: number
  bornAt: string
  co2: number
  lightPeriod: number
  lightModel: string
  gravel: string
  filter: string
  allPhotos: {
    id: number
    url: string
    likes: number
    comments: number
  }[]
  plants: {
    id: number
    name: string
  }[]
  fertilizers: {
    id: number
    name: string
    dose: string
  }[]
}
