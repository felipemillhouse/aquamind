import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabScreenProps,
} from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { IconButton } from 'react-native-paper'

import { ConfigRTK } from 'store/config'
import Feed from 'View/Feed'
import Knowledge from 'View/Knowledge'
import MyTanks from 'View/MyTanks'
import TankDetailView from 'View/TankDetail'
import LoginView from 'View/Login'
import CreateAccountView from 'View/CreateAccount'
import ForgotPasswordView from 'View/ForgotPassword'
import AddTankView from 'View/AddTank'
import AddFertilizerView from 'View/AddFertilizer'
import AddPlantView from 'View/AddPlant'
import ProfileView from 'View/Profile'
import ContactUsView from 'View/ContactUs'
import { RootState } from 'store/rootReducer'
import theme from 'View/Theme'

type FertilizerDoseDataType = {
  id: number
  name: string
  dose: string
}[]
type PlantDataType = {
  id: number
  name: string
}[]
type RootStackParamList = {
  myTanks: undefined
  addTank:
    | {
        fertilizerDoseData?: FertilizerDoseDataType
        plantCallbackData?: PlantDataType
        tankId?: number
      }
    | undefined
  tankDetail: { id: number }
  feed: undefined
  knowledge: undefined
  addFertilizer: { fertilizerDoseData: FertilizerDoseDataType }
  addPlant: { plantData: PlantDataType }
  login: undefined
  createAccount: undefined
  forgotPassword: undefined
  profile: undefined
  contactUs: undefined
  rooTabs: undefined
}
type RootTabParamList = {
  FeedTab: undefined
  myTanksTab: undefined
  knowledgeTab: undefined
}
// Exporting types to screens
// --- FeedTab
type FeedTabScreenNavigationProp = MaterialBottomTabScreenProps<RootTabParamList, 'FeedTab'>
type FeedTabScreenRouteProp = RouteProp<RootTabParamList, 'FeedTab'>
export type FeedTabProps = {
  navigation: FeedTabScreenNavigationProp
  route: FeedTabScreenRouteProp
}
// --- myTanksTab
type MyTanksTabScreenNavigationProp = MaterialBottomTabScreenProps<RootTabParamList, 'myTanksTab'>
type MyTanksTabScreenRouteProp = RouteProp<RootTabParamList, 'myTanksTab'>
export type MyTanksTabProps = {
  navigation: MyTanksTabScreenNavigationProp
  route: MyTanksTabScreenRouteProp
}
// --- knowledgeTab
type KnowledgeTabScreenNavigationProp = MaterialBottomTabScreenProps<
  RootTabParamList,
  'knowledgeTab'
>
type KnowledgeTabScreenRouteProp = RouteProp<RootTabParamList, 'knowledgeTab'>
export type KnowledgeTabProps = {
  navigation: KnowledgeTabScreenNavigationProp
  route: KnowledgeTabScreenRouteProp
}
// --- login
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'login'>
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'login'>
export type LoginProps = {
  navigation: LoginScreenNavigationProp
  route: LoginScreenRouteProp
}
// --- createAccount
type CreateAccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'createAccount'>
type CreateAccountScreenRouteProp = RouteProp<RootStackParamList, 'createAccount'>
export type CreateAccountProps = {
  navigation: CreateAccountScreenNavigationProp
  route: CreateAccountScreenRouteProp
}
// --- forgotPassword
type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'forgotPassword'>
type ForgotPasswordScreenRouteProp = RouteProp<RootStackParamList, 'forgotPassword'>
export type ForgotPasswordProps = {
  navigation: ForgotPasswordScreenNavigationProp
  route: ForgotPasswordScreenRouteProp
}
// --- feed
type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'feed'>
type FeedScreenRouteProp = RouteProp<RootStackParamList, 'feed'>
export type FeedProps = {
  navigation: FeedScreenNavigationProp
  route: FeedScreenRouteProp
}
// --- knowledge
type KnowledgeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'knowledge'>
type KnowledgeScreenRouteProp = RouteProp<RootStackParamList, 'knowledge'>
export type KnowledgeProps = {
  navigation: KnowledgeScreenNavigationProp
  route: KnowledgeScreenRouteProp
}
// --- myTanks
type MyTanksScreenNavigationProp = StackNavigationProp<RootStackParamList, 'myTanks'>
type MyTanksScreenRouteProp = RouteProp<RootStackParamList, 'myTanks'>
export type MyTanksProps = {
  navigation: MyTanksScreenNavigationProp
  route: MyTanksScreenRouteProp
}
// --- tankDetail
type TankDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'tankDetail'>
type TankDetailScreenRouteProp = RouteProp<RootStackParamList, 'tankDetail'>
export type TankDetailProps = {
  navigation: TankDetailScreenNavigationProp
  route: TankDetailScreenRouteProp
}
// --- addTank
type addTankScreenNavigationProp = StackNavigationProp<RootStackParamList, 'addTank'>
type addTankScreenRouteProp = RouteProp<RootStackParamList, 'addTank'>
export type addTankProps = {
  navigation: addTankScreenNavigationProp
  route: addTankScreenRouteProp
}
// --- addFertilizer
type AddFertilizerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'addFertilizer'>
type AddFertilizerScreenRouteProp = RouteProp<RootStackParamList, 'addFertilizer'>
export type AddFertilizerProps = {
  navigation: AddFertilizerScreenNavigationProp
  route: AddFertilizerScreenRouteProp
}
// --- addPlant
type AddPlantScreenNavigationProp = StackNavigationProp<RootStackParamList, 'addPlant'>
type AddPlantScreenRouteProp = RouteProp<RootStackParamList, 'addPlant'>
export type AddPlantProps = {
  navigation: AddPlantScreenNavigationProp
  route: AddPlantScreenRouteProp
}
// --- profile
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'profile'>
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'profile'>
export type ProfileProps = {
  navigation: ProfileScreenNavigationProp
  route: ProfileScreenRouteProp
}
// --- contactUs
type ContactUsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'contactUs'>
type ContactUsScreenRouteProp = RouteProp<RootStackParamList, 'contactUs'>
export type ContactUsProps = {
  navigation: ContactUsScreenNavigationProp
  route: ContactUsScreenRouteProp
}

const Routes: React.FC = () => {
  const dispatch = useDispatch()
  const authenticated = useSelector((state: RootState) => state.config.authenticated)
  //
  // Scenes
  //
  const Stack = createStackNavigator<RootStackParamList>()
  const Tab = createMaterialBottomTabNavigator<RootTabParamList>()

  const FeedTab: React.FC = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.surface,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="feed"
        component={Feed}
        options={{
          title: 'Aquamind',
          headerRight: () => (
            <IconButton
              icon="menu"
              color={theme.colors.surface}
              onPress={() => dispatch(ConfigRTK.actions.showDrawer(true))}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )

  const KnowledgeTab: React.FC = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.surface,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="knowledge"
        component={Knowledge}
        options={{
          title: 'Aquamind',
          headerRight: () => (
            <IconButton
              icon="menu"
              color={theme.colors.surface}
              onPress={() => dispatch(ConfigRTK.actions.showDrawer(true))}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )

  const MyTanksTab: React.FC = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.surface,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="myTanks"
        component={MyTanks}
        options={{
          title: 'Aquamind',
          headerStyle: {
            backgroundColor: theme.colors.primary,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerRight: () => (
            <IconButton
              icon="menu"
              color={theme.colors.surface}
              onPress={() => dispatch(ConfigRTK.actions.showDrawer(true))}
            />
          ),
        }}
      />
      <Stack.Screen
        name="tankDetail"
        component={TankDetailView}
        options={{
          title: 'My Tank',
        }}
      />
      <Stack.Screen
        name="addTank"
        component={AddTankView}
        options={{
          title: 'New Tank',
        }}
      />
      <Stack.Screen
        name="addFertilizer"
        component={AddFertilizerView}
        options={{
          title: 'Add Fertilizer',
        }}
      />
      <Stack.Screen
        name="addPlant"
        component={AddPlantView}
        options={{
          title: 'Add Plant',
        }}
      />
      <Stack.Screen
        name="profile"
        component={ProfileView}
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: theme.colors.primary,
            shadowColor: 'transparent',
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="contactUs"
        component={ContactUsView}
        options={{
          title: 'Send us a Message',
        }}
      />
    </Stack.Navigator>
  )

  const RootTab: React.FC = () => (
    <Tab.Navigator
      initialRouteName="myTanksTab"
      barStyle={{
        backgroundColor: theme.colors.background,
      }}
      inactiveColor={theme.colors.disabled}
      activeColor={theme.colors.primary}
      shifting
    >
      <Tab.Screen
        name="FeedTab"
        component={FeedTab}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ focused }): React.ReactNode => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? theme.colors.primary : theme.colors.disabled}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="myTanksTab"
        component={MyTanksTab}
        options={{
          tabBarLabel: 'My Tanks',
          tabBarIcon: ({ focused }): React.ReactNode => (
            <MaterialCommunityIcons
              name="image-outline"
              color={focused ? theme.colors.primary : theme.colors.disabled}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="knowledgeTab"
        component={KnowledgeTab}
        options={{
          tabBarLabel: 'Knowledge',
          tabBarIcon: ({ focused }): React.ReactNode => (
            <MaterialCommunityIcons
              name="library"
              color={focused ? theme.colors.primary : theme.colors.disabled}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )

  const Scenes: React.FC = () => (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={!authenticated ? 'login' : 'rooTabs'}
      >
        <Stack.Screen name="login" component={LoginView} />
        <Stack.Screen name="createAccount" component={CreateAccountView} />
        <Stack.Screen name="forgotPassword" component={ForgotPasswordView} />
        <Stack.Screen name="rooTabs" component={RootTab} />
      </Stack.Navigator>
    </NavigationContainer>
  )

  return <Scenes />
}

export default Routes
