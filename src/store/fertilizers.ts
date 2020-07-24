import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type FertilizersState = {
  id: number
  name: string
  photo?: string[]
  description?: string
}
const initialState: FertilizersState[] = []

export default createSlice({
  name: 'fertilizers',
  initialState,
  reducers: {
    logout: () => initialState,
    setFertilizers: (state, action: PayloadAction<FertilizersState[]>) => action.payload,
  },
})
