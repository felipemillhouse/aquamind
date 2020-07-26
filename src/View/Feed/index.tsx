import React from 'react'
import { View } from 'react-native'
import { Title } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { FeedProps } from '../../routes'
import { RootState } from '../../store/rootReducer'

const Feed = ({ navigation }: FeedProps) => {
  return (
    <View>
      <Title>Feed</Title>
    </View>
  )
}

export default Feed
