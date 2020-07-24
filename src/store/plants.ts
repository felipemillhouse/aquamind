import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PlantsState = {
  id: number
  name: string
  photo?: string[]
  description?: string
}
const initialState: PlantsState[] = []

export default createSlice({
  name: 'plants',
  initialState,
  reducers: {
    logout: () => initialState,
    setPlants: (state, action: PayloadAction<PlantsState[]>) => action.payload,
  },
})
