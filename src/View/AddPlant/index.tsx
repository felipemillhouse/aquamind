import React, { useState } from 'react'
import { TouchableRipple, Divider } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { View } from 'react-native'
import _ from 'lodash'

import { AddPlantProps } from 'routes'
import ConfigRTK from 'store/config'
import { RootState } from 'store/rootReducer'
import theme from 'View/@Theme'
import { MainView, Searchbar, ScrollView, Text, Icon, RowView } from './styles'

const AddPlant = ({ route, navigation }: AddPlantProps) => {
  const plants = useSelector((state: RootState) => state.plants)
  const dispatch = useDispatch()
  const plantData = route.params?.plantData
  const [search, setSearch] = useState('')

  const changeSearchText = (text: string) => {
    setSearch(text)
  }

  type handleClickProps = {
    id: number
    name: string
  }

  const save = ({ id, name }: handleClickProps) => {
    const plantAddData = {
      id,
      name,
    }

    navigation.navigate('addTank', {
      plantCallbackData: [...plantData, plantAddData],
    })
  }

  const handleClick = ({ id, name }: handleClickProps) => {
    const alreadyHas = _.find(plantData, { id })
    if (plantData?.length > 0 && !!alreadyHas) {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: `You already have ${name} added to your tank`,
          okText: 'Ok',
        }),
      )
      return
    }
    dispatch(
      ConfigRTK.actions.setAlert({
        visible: true,
        alertTitle: 'Add New Plant',
        alertMessage: `Do You want to add ${name} to your tank?`,
        okText: 'Yes',
        cancelText: 'No',
        okPress: () => save({ id, name }),
      }),
    )
  }

  const renderList = () => {
    let plantList = plants
    if (search.length > 1) {
      plantList = _.filter(plants, item => {
        if (_.toUpper(item.name).search(_.toUpper(search)) !== -1) return true
        return false
      })
    }

    return _.map(plantList, item => {
      return (
        <View key={item.id}>
          <TouchableRipple onPress={() => handleClick({ id: item.id, name: item.name })}>
            <RowView>
              <Icon icon="leaf" color={theme.colors.green} />
              <Text>{item.name}</Text>
            </RowView>
          </TouchableRipple>
          <Divider />
        </View>
      )
    })
  }

  return (
    <MainView>
      <Searchbar value={search} onChangeText={text => changeSearchText(text)} />
      <ScrollView>{renderList()}</ScrollView>
    </MainView>
  )
}

export default AddPlant
