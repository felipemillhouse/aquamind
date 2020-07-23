import { combineReducers } from 'redux'

import user from './user'
import tanks from './tanks'
import plants from './plants'
import fertilizers from './fertilizers'
import config from './config'

export const rootReducer = combineReducers({
  user: user.reducer,
  config: config.reducer,
  tanks: tanks.reducer,
  plants: plants.reducer,
  fertilizers: fertilizers.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
