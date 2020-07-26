import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableRipple, Divider } from 'react-native-paper'
import _ from 'lodash'
import { View } from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view'
import moment from 'moment'

import { getTanks } from 'API/tanks'
import TanksRTK from 'store/tanks'
import { MyTanksProps } from 'routes'
import theme from 'View/Theme'
import AvatarImg from 'assets/Avatar.png'
import { ConfigRTK } from 'store/config'
import { RootState } from 'store/rootReducer'
import Drawer from 'View/Components/Drawer'
import FlatListItem from './Components/FlatListItem'
import {
  MainView,
  HeaderView,
  HeaderTitle,
  ContentView,
  AddNewButton,
  Avatar,
  ScrollView,
  ActionView,
  ActionButton,
  ActionButtonText,
  ActionButtonEmptyView,
  Icon,
} from './styles'

const MyTanks = ({ navigation }: MyTanksProps) => {
  const dispatch = useDispatch()
  const tanks = useSelector((state: RootState) => state.tanks)
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    async function fetch() {
      if (!tanks.length) {
        dispatch(ConfigRTK.actions.setLoading({ visible: true }))
        const response = await getTanks(1)
        dispatch(ConfigRTK.actions.setLoading({ visible: false }))
        if (response) dispatch(TanksRTK.actions.setTanks(response))
      }
    }
    fetch()
  }, [dispatch, tanks.length])

  const deleteHandler = (id: number) => {
    const tankClicked = _.find(tanks, { id })
    dispatch(
      ConfigRTK.actions.setAlert({
        visible: true,
        alertTitle: 'Delete Tank',
        alertMessage: `Are you sure that you want to delete the ${tankClicked?.title} tank and their photos?`,
        cancelText: 'No',
        okText: 'Yes',
      }),
    )
    // implement Delete action
  }

  const renderTanks = () => {
    return _.map(tanks, tank => (
      <View key={tank.id}>
        <SwipeRow rightOpenValue={-140} stopRightSwipe={-160} stopLeftSwipe={0.1}>
          <ActionView>
            <ActionButtonEmptyView />
            <ActionButton
              onPress={() => deleteHandler(tank.id)}
              delete
              rippleColor={theme.colors.onSurface}
            >
              <>
                <Icon icon="delete-outline" />
                <ActionButtonText>Delete</ActionButtonText>
              </>
            </ActionButton>
            <ActionButton
              onPress={() => navigation.navigate('addTank', { tankId: tank.id })}
              rippleColor={theme.colors.onSurface}
            >
              <>
                <Icon icon="square-edit-outline" />
                <ActionButtonText>Update</ActionButtonText>
              </>
            </ActionButton>
          </ActionView>
          <TouchableRipple
            onPress={() =>
              navigation.navigate('tankDetail', {
                id: tank.id,
              })
            }
          >
            <FlatListItem
              createdAt={moment(tank.bornAt).fromNow()}
              dimensions={`${tank.length}x${tank.width}x${tank.height}`}
              title={tank.title}
              comments={tank.comments}
              imageURL={tank.coverImageURL}
            />
          </TouchableRipple>
        </SwipeRow>
        <Divider />
      </View>
    ))
  }

  return (
    <MainView>
      <TouchableRipple onPress={() => navigation.navigate('profile')}>
        <HeaderView>
          <Avatar source={user.avatar ? { uri: user.avatar } : AvatarImg} />
        </HeaderView>
      </TouchableRipple>
      <ScrollView>
        <ContentView>
          <TouchableRipple onPress={() => navigation.navigate('profile')}>
            <HeaderTitle>{`@${user.username}`}</HeaderTitle>
          </TouchableRipple>
          <AddNewButton mode="text" icon="plus" onPress={() => navigation.navigate('addTank')}>
            Add new
          </AddNewButton>
          {renderTanks()}
        </ContentView>
      </ScrollView>
      <Drawer />
    </MainView>
  )
}

export default MyTanks
