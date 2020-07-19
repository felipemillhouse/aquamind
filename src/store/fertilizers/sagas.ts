import { put, call } from 'redux-saga/effects'

import API from 'services/api'
import { setFertilizers } from './actions'

export function* getFertilizers() {
  try {
    const response = yield call(API.get, `/fertilizers`)
    if (response?.data) {
      yield put(setFertilizers(response.data))
    }
  } catch (error) {
    // probably Sentry
  }
}
