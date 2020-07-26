import React, { useState } from 'react'
import { TouchableRipple, Divider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { View } from 'react-native'
import _ from 'lodash'

import { AddFertilizerProps } from 'routes'
import { RootState } from 'store/rootReducer'
import theme from 'View/Theme'
import SelectDose from './Components/SelectDose'
import { MainView, Searchbar, ScrollView, Text, Icon, RowView } from './styles'

const AddFertilizer = ({ route }: AddFertilizerProps) => {
  const [search, setSearch] = useState('')
  const [selectDoseAlert, setSelectDoseAlert] = useState(false)
  const [fertilizerId, setFertilizerId] = useState(0)
  const [fertilizerName, setFertilizerName] = useState('')
  const fertilizers = useSelector((state: RootState) => state.fertilizers)

  const changeSearchText = (text: string) => {
    setSearch(text)
  }

  type handleClickProps = {
    id: number
    name: string
  }
  const handleClick = ({ id, name }: handleClickProps) => {
    setFertilizerId(id)
    setFertilizerName(name)
    setSelectDoseAlert(true)
  }

  const renderList = () => {
    let fertilizerList = fertilizers
    if (search.length > 1) {
      fertilizerList = _.filter(fertilizers, item => {
        if (_.toUpper(item.name).search(_.toUpper(search)) !== -1) return true
        return false
      })
    }

    return _.map(fertilizerList, item => {
      return (
        <View key={item.id}>
          <TouchableRipple onPress={() => handleClick({ id: item.id, name: item.name })}>
            <RowView>
              <Icon icon="water-outline" color={theme.colors.primary} />
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
      <SelectDose
        visible={selectDoseAlert}
        onDismiss={setSelectDoseAlert}
        fertilizerId={fertilizerId}
        fertilizerName={fertilizerName}
        fertilizerData={route.params?.fertilizerDoseData || []}
      />
    </MainView>
  )
}

export default AddFertilizer
