/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native'
// import ReactotronFlipper from 'reactotron-react-native/dist/flipper'
import { reactotronRedux } from 'reactotron-redux'
import AsyncStorage from '@react-native-community/async-storage'

declare global {
  interface Console {
    tron: any
  }
}
if (__DEV__) {
  Reactotron.setAsyncStorageHandler!(AsyncStorage)
  Reactotron.configure({
    name: 'Aquamind',
    // createSocket: path => new ReactotronFlipper(path),
  })
  Reactotron.useReactNative({
    asyncStorage: {},
  })
  Reactotron.use(reactotronRedux())
  Reactotron.connect()
  Reactotron.clear!()

  console.tron = Reactotron
  const oldConsoleLog = console.log
  console.log = (...log) => {
    oldConsoleLog(...log)
    Reactotron.logImportant!(...log)
    // Reactotron.display({
    //   name: 'LOG',
    //   preview: JSON.stringify(log),
    //   value: log,
    //   important: true,
    // })
  }
}
