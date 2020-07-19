import { put, call } from 'redux-saga/effects'

import API from 'services/api'
import { setLoading } from 'store/config/actions'
import { setUser } from './actions'

type getUserActionType = { type: 'USER_GET_USER'; userId: number }
export function* getUser(action: getUserActionType) {
  try {
    yield put(setLoading(true))

    const response = yield call(API.get, `/users/${action.userId}`)

    if (response.status === 200) {
      yield put(setUser(response?.data))
    }
  } catch (error) {
    // probably Sentry
  } finally {
    yield put(setLoading(false))
  }
}
