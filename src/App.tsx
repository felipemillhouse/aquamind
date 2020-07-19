/* eslint-disable @typescript-eslint/camelcase */
import React from 'react'
import './config/ReactotronConfig'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as PaperProvider } from 'react-native-paper'
import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_300Light,
  Roboto_100Thin,
} from '@expo-google-fonts/roboto'

import { store, persistor } from './store'
import AppLoading from './View/@Components/FakeLoadingScreen'
import Loading from './View/@Components/Loading'
import Alert from './View/@Components/Alert'
import theme from './View/@Theme'
import Routes from './routes'

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_300Light,
    Roboto_100Thin,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="light-content" />
          <Routes />
        </PersistGate>
        <Loading />
        <Alert />
      </PaperProvider>
    </Provider>
  )
}

export default App
