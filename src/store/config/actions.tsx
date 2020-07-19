import { ActionTypes } from './types'

type setAlertParams = {
  visible: boolean
  alertTitle: string
  alertMessage: string
  cancelText?: string
  okPress?: CallableFunction | null
  okText?: string
}

export function setLoading(visible: boolean, loadingMessage = 'Loading'): ActionTypes {
  return { type: 'CONFIG_SET_LOADING', payload: { visible, loadingMessage } }
}

export function setAlert({
  visible,
  alertTitle = ' ',
  alertMessage = ' ',
  cancelText = ' ',
  okPress = null,
  okText = ' ',
}: setAlertParams): ActionTypes {
  return {
    type: 'CONFIG_SET_ALERT',
    payload: {
      visible,
      alertTitle,
      alertMessage,
      cancelText,
      okPress,
      okText,
    },
  }
}

export function hideAlert(): ActionTypes {
  return {
    type: 'CONFIG_HIDE_ALERT',
  }
}

export function setAuthenticated(authenticated: boolean): ActionTypes {
  return { type: 'CONFIG_SET_AUTHENTICATED', payload: { authenticated } }
}

export function showDrawer(drawerVisible: boolean): ActionTypes {
  return { type: 'CONFIG_SHOW_DRAWER', payload: { drawerVisible } }
}
