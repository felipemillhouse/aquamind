import { combineReducers } from 'redux'

import user from './user'
import tanks from './tanks'
import plants from './plants'
import fertilizers from './fertilizers'
import feed from './feed'
import { ConfigRTK } from './config'

export const rootReducer = combineReducers({
  user: user.reducer,
  config: ConfigRTK.reducer,
  tanks: tanks.reducer,
  plants: plants.reducer,
  fertilizers: fertilizers.reducer,
  feed: feed.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
