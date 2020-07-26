import React from 'react'

import theme from '../../../Theme'
import { Description, View, Icon, RowView } from './styles'

type FlatListItemType = {
  text: string
  type: string
}
const FlatListItem: React.FC<FlatListItemType> = ({ text, type }) => {
  return (
    <View>
      <RowView>
        <Icon
          icon={type === 'plant' ? 'leaf' : 'water-outline'}
          color={type === 'plant' ? theme.colors.green : theme.colors.primary}
        />
        <Description>{text}</Description>
      </RowView>
    </View>
  )
}

export default FlatListItem
