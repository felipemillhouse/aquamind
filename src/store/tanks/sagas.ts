import { put, call } from 'redux-saga/effects'

import API from 'services/api'
import { setLoading } from 'store/config/actions'
import { setTanks } from './actions'

type actionType = { type: 'TANKS_GET_TANKS'; userId: number }
export function* getTanks(action: actionType) {
  try {
    yield put(setLoading(true))

    const response = yield call(API.get, `/tanks?userId=${action.userId}`)

    if (response.status === 200) {
      yield put(setTanks(response?.data))
    }
  } catch (error) {
    // probably Sentry
  } finally {
    yield put(setLoading(false))
  }
}
