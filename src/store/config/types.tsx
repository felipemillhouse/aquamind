export type ActionTypes =
  | {
      type: 'CONFIG_SET_LOADING'
      payload: { visible: boolean; loadingMessage: string }
    }
  | {
      type: 'CONFIG_SET_AUTHENTICATED'
      payload: { authenticated: boolean }
    }
  | {
      type: 'CONFIG_SET_ALERT'
      payload: {
        visible: boolean
        alertTitle: string
        alertMessage: string
        cancelText?: string
        okPress?: CallableFunction | null
        okText?: string
      }
    }
  | { type: 'CONFIG_HIDE_ALERT' }
  | {
      type: 'CONFIG_SHOW_DRAWER'
      payload: { drawerVisible: boolean }
    }

export type StateType = {
  loading: {
    visible: boolean
    loadingMessage: string
  }
  authenticated: boolean
  drawerVisible: boolean
  alert: {
    visible: boolean
    alertTitle: string
    alertMessage: string
    cancelText?: string
    okPress?: CallableFunction | null
    okText?: string
  }
}
