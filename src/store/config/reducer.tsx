import { ActionTypes, StateType } from './types'

const initialState: StateType = {
  loading: {
    visible: false,
    loadingMessage: 'Loading',
  },
  authenticated: false,
  drawerVisible: false,
  alert: {
    visible: false,
    alertTitle: ' ',
    alertMessage: ' ',
    cancelText: ' ',
    okPress: null,
    okText: ' ',
  },
}

export default function configReducer(state = initialState, action: ActionTypes): StateType {
  switch (action.type) {
    case 'CONFIG_SET_LOADING':
      return {
        ...state,
        loading: {
          visible: action.payload.visible,
          loadingMessage: action.payload.loadingMessage,
        },
      }
    case 'CONFIG_SET_AUTHENTICATED':
      return {
        ...state,
        authenticated: action.payload.authenticated,
      }
    case 'CONFIG_SET_ALERT':
      return {
        ...state,
        alert: {
          visible: action.payload.visible,
          alertTitle: action.payload.alertTitle,
          alertMessage: action.payload.alertMessage,
          cancelText: action.payload.cancelText,
          okPress: action.payload.okPress,
          okText: action.payload.okText,
        },
      }
    case 'CONFIG_HIDE_ALERT':
      return { ...state, alert: initialState.alert }
    case 'CONFIG_SHOW_DRAWER':
      return { ...state, drawerVisible: action.payload.drawerVisible }
    default:
      return state
  }
}
