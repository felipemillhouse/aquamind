import { put, call } from 'redux-saga/effects'

import API from 'services/api'
import { setPlants } from './actions'

export function* getPlants() {
  try {
    const response = yield call(API.get, `/plants`)
    if (response?.data) {
      yield put(setPlants(response.data))
    }
  } catch (error) {
    // probably Sentry
  }
}
