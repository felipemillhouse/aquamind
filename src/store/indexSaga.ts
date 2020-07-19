import { all, takeLatest, takeLeading } from 'redux-saga/effects'

import { Actions as TanksAction } from './tanks/types'
import { Actions as PlantsAction } from './plants/types'
import { Actions as FertilizersAction } from './fertilizers/types'
import { Actions as UserAction } from './user/types'

import { getTanks } from './tanks/sagas'
import { getPlants } from './plants/sagas'
import { getFertilizers } from './fertilizers/sagas'
import { getUser } from './user/sagas'

export default function* rootSaga() {
  yield all([
    takeLeading(TanksAction.TANKS_GET_TANKS, getTanks),
    takeLeading(PlantsAction.PLANTS_GET_PLANTS, getPlants),
    takeLeading(FertilizersAction.FERTILIZERS_GET_FERTILIZERS, getFertilizers),
    takeLeading(UserAction.USER_GET_USER, getUser),
  ])
}
