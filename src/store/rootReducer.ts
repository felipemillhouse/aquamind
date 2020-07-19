import { combineReducers } from 'redux'

import user from './user/reducer'
import config from './config/reducer'
import tanks from './tanks/reducer'
import plants from './plants/reducer'
import fertilizers from './fertilizers/reducer'

export const rootReducer = combineReducers({
  user,
  config,
  tanks,
  plants,
  fertilizers,
})

export type RootState = ReturnType<typeof rootReducer>
