import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
const initialState: TanksState[] = []

export default createSlice({
  name: 'tanks',
  initialState,
  reducers: {
    logout: () => initialState,
    setTanks: (state, action: PayloadAction<TanksState[]>) => action.payload,
  },
})
