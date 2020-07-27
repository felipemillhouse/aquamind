import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type FeedState = {
  feedId: number
  photoUrl: string
  width: number
  height: number
  userName: string
  dimensions: string
  userAvatar?: string
  likes: number
  comments: number
  date: string
}
const initialState: FeedState[] = []

export default createSlice({
  name: 'feed',
  initialState,
  reducers: {
    logout: () => initialState,
    setFeed: (state, action: PayloadAction<FeedState[]>) => action.payload,
  },
})
